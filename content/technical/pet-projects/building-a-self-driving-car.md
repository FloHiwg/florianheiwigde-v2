---
title: "Building My First DIY Self-Driving Car: From Robotics Theory to a Real Autonomous Vehicle"
date: 2026-01-20
description: "A practical walkthrough of turning a robotics course bonus project into a small autonomous car, covering the plan, hardware choices, chassis research, and how theory meets real-world constraints."
tags: ["Robotics", "AI", "Hardware", "Autonomous Systems"]
---

## Introduction

This semester, I am taking a course called *Robotics: AI Techniques*. It covers the core ideas behind autonomous systems: localization, sensor fusion, Kalman filters, particle filters, and path planning.

As part of the course, there is an option to earn extra credit by applying some of these concepts in a practical project.

That was enough of an excuse.

It is one thing to implement filters and estimators in assignments. It is another to run them on real hardware and see what happens when equations meet friction, voltage drops, and imperfect calibration.

Instead of keeping everything inside simulations, I decided to build something physical.

A small self-driving car.

Not just remote-controlled, but autonomous. A system that can sense its environment, estimate its own state, and eventually navigate without me steering it.

This post documents the starting point: the idea, the plan, the hardware decisions, and how I am turning course theory into something that actually moves.

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

1. **Mechanical foundation**  
   Build a stable chassis with working motors and steering.

2. **Manual control**  
   Make sure the car can drive reliably under direct control. If the base platform is unstable, no algorithm will save it.

3. **Sensor integration**  
   Read and log sensor data. Understand the noise characteristics before trying to filter anything.

4. **State estimation**  
   Implement velocity estimation, orientation tracking, and basic sensor fusion.

5. **Simple autonomy**  
   Add obstacle detection and eventually basic navigation.

The idea is to build layers:

mechanics → control → sensing → estimation → decision-making

Each layer should work on its own before adding the next.


## Finding a Good Basis for the Chassis

This time, I was sure about one thing from the beginning: I wanted to print the chassis myself.

After printing a drone frame and seeing how satisfying it was to understand the mechanical structure from the ground up, buying a fully assembled RC car felt like skipping part of the fun.

In theory, this sounded simple. In practice, it wasn’t.

Finding a printable chassis that is:

- offering enough space for components
- not overly complex or fragile
- compatible with the motors and servos I have bought

is harder than it looks.

There are plenty of impressive 3D printed RC car models out there. Many of them are beautifully engineered. But a lot of them are either:

- designed for very specific components
- or so complex that the mechanical build becomes its own multi-week project  

For this project, I don’t need perfection. I need something good enough to start iterating.

For now, I decided to use the following model as a basis and see how far it gets me:

https://www.printables.com/model/415497-3d-printed-rc-car/files

It’s simple, modular, and designed around common components and offers enough space for my electronics. More importantly, it gives me a starting point without forcing me to design suspension geometry from scratch.

I fully expect to modify it.

Printing a chassis is not about getting it right on the first try. It’s about having a mechanical foundation that I can adjust once I understand the constraints better.

Just like with the drone frame, the point is not that it’s optimal.

The point is that it’s mine.

## Hardware & Parts

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

## From Algorithms to Reality

The interesting part begins once the car can move and the sensors produce usable data.

This is where the robotics concepts from the course come in.

Kalman filters are elegant on paper. Particle filters look beautiful in diagrams. But their real value shows up when the first data comes in and you see if you can actually estimate velocity, orientation, and position in a way that is stable enough to drive.


## Final Thoughts

I probably did not need another side project.

But this one feels different.

It sits exactly at the intersection of theory and hardware. It forces the math to prove itself. It turns abstract concepts into something tangible.

Worst case, I learn a lot about robotics and burn out a few inexpensive components.

Best case, I end up with a small car that can move through my apartment without crashing into furniture.

Both outcomes are acceptable.

This is the starting point.

Now it is time to build.