---
title: "Building My First DIY Self-Driving Car: From Course Theory to a Real Build"
date: 2026-01-20
description: "A practical walkthrough of turning a robotics course bonus project into a small autonomous car: choosing a printable chassis, picking parts, planning the bring-up, and mapping a path from manual control to autonomy."
---

## Introduction

This semester, I am taking a course called *Robotics: AI Techniques*. It covers the core ideas behind autonomous systems: localization, sensor fusion, Kalman filters, particle filters, and path planning.

As part of the course, there is an option to earn extra credit by applying some of these concepts in a practical project.

That was enough of an excuse.

It is one thing to implement filters and estimators in assignments. It is another to run them on real hardware and see what happens when equations meet friction, voltage drops, and imperfect calibration.

Instead of keeping everything inside simulations, I decided to build something physical.

A small self-driving car.

Not just remote-controlled, but autonomous. A system that can sense its environment, estimate its own state, and eventually navigate without me steering it.

This post documents the starting point in the same spirit as my drone build: what I am trying to build, what I am buying, what I am optimizing for (and what I am not), and how I plan to bring it up step by step until it can drive on its own.

## The Idea

After building the drone, I realized how different it feels when software interacts with the physical world. Bugs stop being abstract. If your logic is wrong, something drifts, tips over, or hits a wall.

Autonomous driving is a different kind of challenge than flying. It is less about reflexes and manual control, and more about perception and reasoning.

I do not want to steer the car.

I want the car to steer itself.

The goal sounds simple: put it on the floor, press start, and let it drive around without hitting anything.

In practice, that small sentence hides a full stack of problems:

- How does the car know where it is?
- How does it estimate speed and orientation?
- How does it detect obstacles?
- How does it combine noisy sensor data into something usable?

That stack is exactly what the course is about.

So instead of treating the algorithms as isolated exercises, I am treating the car as a test platform.

## The Plan

The approach is deliberately incremental.

I am not starting with autonomy. I am starting with basics.

The layers look like this:

1. Mechanical foundation (chassis, wheels, steering)
2. Manual control (drive it reliably under direct control)
3. Sensor integration (read, log, and understand the noise)
4. State estimation (odometry, IMU, simple fusion)
5. Simple autonomy (don't hit things, then basic navigation)

The point is to avoid the classic trap of trying to debug five problems at once. If the car cannot drive straight under manual control, it has no business running a filter.


## 3D Printing the Chassis

This time, I was sure about one thing from the beginning: I wanted to print the chassis myself.

After printing a drone frame and seeing how satisfying it was to understand the mechanical structure from the ground up, buying a fully assembled RC car felt like skipping part of the fun.

In theory, this sounded simple. In practice, it wasn't.

Finding a printable chassis that is:

- offering enough space for components
- not overly complex or fragile
- compatible with the motors and servos I have bought

is harder than it looks.

There are plenty of impressive 3D printed RC car models out there. Many of them are beautifully engineered. But a lot of them are either:

- designed for very specific components
- or so complex that the mechanical build becomes its own multi-week project  

For this project, I don't need perfection. I need something good enough to start iterating.

For now, I decided to use this model as a basis and see how far it gets me:

[3D Printed RC Car (Printables)](https://www.printables.com/model/415497-3d-printed-rc-car/files)

It's simple, modular, and designed around common components and offers enough space for my electronics. More importantly, it gives me a starting point without forcing me to design suspension geometry from scratch.

I fully expect to modify it.

### Chassis Update

That expectation turned out to be correct: the original design was a good starting point, but it was not directly usable with the TT motors I am using.

Instead of forcing the hardware to fit, I started adapting the chassis.

For now, I am keeping the front part of the model as-is and focusing my changes on the rear section.

The rear part is now cleaned up, with a dedicated mount for the TT motors and an additional mount for the wheel speed sensors. That gives me a much better mechanical starting point for the next assembly steps while preserving the original design where it already works.

{{< figure src="/images/self-driving-car-chassis-render-update.webp" alt="3D render of the adapted self-driving car chassis with cleaned rear section, TT motor mounts, and sensor mounts" caption="Current chassis CAD state: front section kept from the original model, rear section adapted with TT motor and sensor mounts." class="blog-post-figure" >}}

Printing a chassis is not about getting it right on the first try. It's about having a mechanical foundation that I can adjust once I understand the constraints better.

Just like with the drone frame, the point is not that it's optimal.

The point is that it's mine.

## Choosing the Components

For this build, I am keeping things modular and affordable. The goal is not performance. It is flexibility.

### Drive System

- **TT DC Gear Motors (1:48, 3–6V) with plastic wheels**  
  Cheap, common, and good enough for experimentation.

- **TB6612FNG / DRV8833 Dual Motor Driver (1A)**  
  Compact and efficient motor driver, better than the older L298N boards.

- **MG90S Metal Gear Servo (9g)**  
  For steering control. Small but strong enough for a lightweight chassis.


### Motion & State Estimation Sensors

- **GY-521 MPU-6050 (3-axis gyroscope + 3-axis accelerometer)**  
  The core IMU for estimating orientation and motion.

- **LM393 Photoelectric Speed Sensors (groove coupler modules)**  
  Used to measure wheel rotation and estimate velocity.

These components will allow basic odometry and filtering experiments.


### Distance & Environment Sensing

- **VL53L0X Time-of-Flight (ToF) Laser Distance Sensor**  
  Compact and relatively precise at short range.

- **HC-SR04 Ultrasonic Distance Sensor**  
  Simple obstacle detection.

This is enough to experiment with basic obstacle avoidance and multi-sensor fusion.


### Control & Power

- **PCA9685 16-channel PWM driver (I2C)**  
  For stable PWM signal generation without overloading the main controller.

- **MP1584EN Adjustable DC-DC Step-Down Converter (3A)**  
  Efficient voltage regulation from the battery.

- **AMS1117 3.3V / 5V regulator modules**  
  Stable supply rails for sensors and logic components.

The hardware stack is intentionally simple.

It gives me:

- Drive control  
- Velocity measurement  
- Orientation sensing  
- Distance measurement  
- Expandability  

That is enough to start.

And just like with the drone build, there is a quiet part nobody advertises: wiring, connectors, mounting, power distribution, and the small tooling decisions that determine whether bring-up is smooth or miserable.

So I am treating the first phase like a hardware debugging loop: build one subsystem, test it, then add the next.

## Assembly & Bring-Up

The first milestone is intentionally boring: the car should drive forward and steer under manual control without brownouts, random resets, or "it only works when I hold the wires like this" behavior.

Only after that works, I want the next milestone: sensor logging in a format I can plot and inspect, before I try to filter anything.

If you have done hardware projects before, you already know the rule: the fastest way to get to autonomy is to be stubbornly incremental.

### Assembly Update

The next mechanical step is to attach the encoder wheel to the TT motor so I can actually measure wheel speed. After that, I will install the steering assembly that comes with the model and test whether it works with my actuator. If that setup behaves as expected, I can move on to final assembly and wiring, then start driving the steering and motors from the ESP32.

{{< figure src="/images/self-driving-car-assembly-current-state.webp" alt="Current assembly state of the self-driving car project during mechanical integration" caption="Current state of the build during assembly and bring-up, before final wiring and ESP32-controlled testing." class="blog-post-figure" >}}

## From Algorithms to Reality

The interesting part begins once the car can move and the sensors produce usable data.

This is where the robotics concepts from the course come in.

Kalman filters are elegant on paper. Particle filters look beautiful in diagrams. But their real value shows up when the first data comes in and you see if you can actually estimate velocity, orientation, and position in a way that is stable enough to drive.


## Final Thoughts and Next Steps

I probably did not need another side project.

But this one feels different.

It sits exactly at the intersection of theory and hardware. It forces the math to prove itself. It turns abstract concepts into something tangible.

Worst case, I learn a lot about robotics and burn out a few inexpensive components.

Best case, I end up with a small car that can move through my apartment without crashing into furniture.

Both outcomes are acceptable.

This is the starting point.

My next steps are practical:

- Print the chassis and assemble the mechanical platform.
- Bring up manual driving and steering.
- Add sensor logging (IMU, wheel speed, distance sensors).
- Start with the simplest possible state estimation and iterate from there.
