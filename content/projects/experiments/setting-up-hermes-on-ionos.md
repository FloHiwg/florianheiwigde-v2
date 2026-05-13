---
title: "Running Hermes Agent on IONOS with OpenRouter and Kimi 2.6"
date: 2026-05-09
draft: false
description: "A short practical setup note for running Hermes Agent on a low-cost IONOS VPS with SSH access and OpenRouter budgeting."
---

Everyone seems to be talking about [Hermes Agent](https://github.com/NousResearch/hermes-agent) right now.

The interesting part is not only Hermes itself, but the broader idea behind the Hermes harness. It showed how useful it can be to give an AI agent a stronger execution environment around the model instead of treating the model as the whole product. That idea now seems to be influencing the larger frontier labs as well, where more powerful agent harnesses are becoming a serious direction of travel.

So at some point, it feels like something one definitely needs to test.

I wanted a cheap and isolated setup for that experiment. Running Hermes locally would work, but I prefer testing this kind of agent on a small VPS first. It keeps the environment clean, avoids giving the agent direct access to my local machine, and makes it easy to throw the whole thing away if the experiment turns messy.

Here is the quick setup I used with IONOS.

## 1. Pick the VPS

The cheapest useful option I found so far is:

- Provider: IONOS
- Server: VPS M / dedicated server instance
- Memory: 4 GB RAM
- Price: 3 Euro per month for one year
- Setup fee: 0 Euro

That should be enough for a first Hermes setup without overbuilding the server from day one.

## 2. Create a Local SSH Key

Create a dedicated SSH key for this VPS:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/ionos-hermes
```

You can leave the passphrase empty for a quick test setup, but for anything long-running I prefer using a passphrase.

## 3. Add the SSH Key to the Server

Copy the public key:

```bash
cat ~/.ssh/ionos-hermes.pub
```

Then add that value to the server user's `~/.ssh/authorized_keys` file.

On the server, the file should look roughly like this:

```bash
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

Paste the public key into `authorized_keys`, save the file, and close the editor.

## 4. Add a Local SSH Alias

Add an alias to the local SSH config:

```bash
nano ~/.ssh/config
```

Example config:

```sshconfig
Host hermes-ionos
  HostName YOUR_SERVER_IP
  User root
  IdentityFile ~/.ssh/ionos-hermes
  IdentitiesOnly yes
```

After that, connecting is just:

```bash
ssh hermes-ionos
```

If you use a non-root user on the VPS, replace `root` with that username.

## 5. Update the Server

Once connected, update the package lists and install the basic tools:

```bash
apt update
apt upgrade -y
apt install -y curl git
```

If the server uses `sudo`, run the same commands with `sudo`.

## 6. Install Hermes

Run the official installer:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

After installation, follow the prompts from the installer and check the Hermes documentation if it asks for any environment variables or provider settings.

## 7. Use OpenRouter for Budget Control

For the model provider, I would start with OpenRouter. I am using Kimi 2.6 through OpenRouter for this agent setup.

The main reason is budget control: OpenRouter makes it easy to set limits, track token usage, and switch between models without rewriting the setup each time.

That last part is especially useful while testing agents. If Kimi 2.6 is too expensive, too slow, or simply not the right fit for a specific workflow, switching to another model is mostly a configuration change instead of a bigger provider migration.

For this kind of VPS experiment, that is useful because you can keep the server cheap and the model spend predictable.

The rough setup flow is:

1. Create an OpenRouter account
2. Add a small amount of credit
3. Create an API key
4. Add the API key to the Hermes configuration
5. Start with a cheap model and increase quality only if needed

That keeps the first experiment small: cheap server, controlled model spend, and enough room to see whether Hermes is actually useful in practice.

## Final Verdict So Far

I have now moved some of my knowledge base maintenance tasks to the agent.

For that, I had to move the repository workflow to GitLab. The reason is simple: GitLab makes it easy to let an agent access a repo without letting it push directly to `main`. Instead, the agent can create merge requests, and I can still review the changes before anything lands.

I also gave the agent access to my [Podfetcher](https://podfetcher.com/) CLI and MCP setup. That means it can access data from podcasts I am listening to and add relevant information directly to my knowledge repository.

That is the part where the setup starts to become genuinely useful. It is no longer just an agent sitting on a VPS. It can now touch a real workflow, pull in context from things I already consume, and help maintain a knowledge base that would otherwise slowly become stale.

At the same time, I am still cautious. I am now experimenting with giving the agent more access to daily tasks around calendar work, todos, and preparing emails, but I do not want to give it too much access too quickly.

The results are not at a point where I would trust everything blindly. My hope is that the memory and self-learning capabilities make the agent more useful over time, especially once it has seen enough of my workflows, preferences, and recurring tasks.

So the verdict for now is: worth testing, useful enough to keep running, but still something I want to expand carefully.
