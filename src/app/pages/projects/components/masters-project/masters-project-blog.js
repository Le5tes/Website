export const mastersBlogPost = `
# My Masters Project - Teaching a legged robot to walk (in simulation)

It's been a little while since my last blog post. I've been pretty busy, buying a house and doing lots of work on it, and also working on my Master's degree, which I finished last November, as well as my day-to-day job, and doing lots of martial arts. So my poor little robot has just been sitting in a corner looking sad.

![](/image-server/robot_languishing.JPG)

But of course my journey into robotics hasn't stayed still - my Master's degree project was in robotics.
(For the full writeup see [here](/image-server/DissertationCombined.pdf).)

So what did I do?

Well actually I guess the first question is what was I trying to do, and why?

## What I was trying to Achieve
Up until fairly recently my little foray into the world of robotics has been using a simple tracked robot. It's cute and it works well on carpet, but a little robot with only two motors and tracks has some limitations. For a long time I've been wanting to work with legged robots. Not only do they look way cooler(!), but they have great advantages over wheeled and tracked robots when it comes to navigating all sorts of different environments. My little tracked robot can't handle stairs or even bumps larger than a certain size. It can't jump over gaps, or traverse a narrow path. I certainly wouldn't let it go in long grass, since the motors would get full of grass blades, and it's never going to be able to climb through a hedge or up a chain link fence! In fact I'm not sure it'd even deal very well with gravel or mud. All of these things should be theoretically possible for a legged robot of the same size. In fact I'd expect a legged robot to be able to go wherever I can go!

Of course making a legged robot that's actually able to do any of these things is very hard. 

The hardware is quite complicated - you need a number of motors for each leg, and they need to provide enough torque to hold the robot up - but the vast majority of the complexity is in the software controlling the robot.

### How do you build a locomotion controller for legged robots?

Traditional approaches to building locomotion controllers for legged robots are very complex. You need a good understanding of the dynamics and kinematics of the robot, and then use complex optimisation techniques to calculate the signals to send to your robot's motors. This takes a ton of computing power when trying to calculate whole body motion control for very complex robots, so it's usually broken down into a number of smaller systems, such as motion planner for the centre of mass, a motion planner for foot trajectories, a foothold planner, calculators for inverse kinematics, contact scheduling, gait coordination etc. etc. etc.

That's not to say it can't be done, obviously - we've all seen the impressive demos by Boston Dynamics, who primarily use these approaches - but it's a lot of work!

There's some alternative approaches. 

One is using central pattern generators (CPGs). This is a very cool approach that mimics how animals (including people) generate rhythmic signals in their central nervous systems that form the basic patterns of muscular contraction for walking and running. Signals from the brain, as well as sensory inputs such as touch and proprioception, then alter these signals to control the movements. 

In robots you can create software that creates very similar rhythmic patterns and then fine tune them to create signals that allow a robot to walk. This takes a lot less processing power than calculating all the dynamics and kinematics of the robot, and the software is quite a lot simpler. And like in nature, the locomotion signals can be tweaked automatically based on input signals, which allows the robot adapt to different environments and terrains. Of course manually fine-tuning the outputs of the CPG is tedious and challenging. Some systems have used genetic algorithms to do this, but more recently reinforcement learning is used.

Of course you can just use reinforcement learning to teach a robot to walk without having to hand code any systems. This approach has been absolutely groundbreaking recently and enabled some amazing robotic acheivements!

But what is reinforcement learning?

### Understanding reinforcement learning

Reinforcement learning (RL) is a branch of machine learning which involves training an agent to learn from previous experience. This is different from supervised learning, where a model learns from data with a known correct value, and unsupervised learning, where a model learns to pick out patterns in data. For reinforcement learning, we want the agent to make a series of actions that results in a task being completed, depending on what we want it to be able to do. This fits well in robotics since we build robots to acheive tasks, and we don't always know exactly how to program a robot to perform the task, particularly for complex tasks like walking.

In a typical reinforcement learning setup, we provide the agent with information about the state of the world and it chooses an action. As a result, the world then transitions to new state, and the agent possibly receives a reward. The agent learns to choose actions to maximise the reward it receives. 

It would take too long to go into the details of exactly how different reinforcement algorithms work, but if you want to learn more there are some great resources available, such as: 
- ["Mastering Reinforcement Learning"](https://gibberblot.github.io/rl-notes/index.html): Provides an excellent introduction into the ideas of reinforcement learning
- [OpenAI's "Spinning Up"](https://spinningup.openai.com/): Focused on learning Deep RL for researchers, with explanations of some powerful Deep RL algorithms such as PPO and SAC.

### Dealing with sparse Rewards

One area that I was particularly interested in as part of this project was how to improve learning when the rewards available for an agent in its environment are sparse.  

The reward function is something we choose. In some cases, we can give a reward for every action taken by the agent, such as a positive reward if it moves towards the goal and a negative one if it moves away. Often though, we can't be sure of the best way towards the goal. For example if the agent were driving a robot through a maze, and we made the reward based on the straight line distance to the exit of the maze, the robot would get stuck any time the correct path means it has to move away from the goal point. We therefore have to try to choose a reward function that helps the agent learn to acheive it's goal without getting trapped in non-optimal states. Sometimes the only solution is to only give the agent a reward when it actually acheives its goal. In other cases, we may be aware of milestones towards acheiving the goal and can give the agent rewards then. Either way, the rewards are few and far between. This obviously slows learning a lot since the robot can only learn from rewards that it receives. For a difficult problem we may never even reach the point of receiving any reward, which means the agent simply won't learn.

There are a few ways to make it easier for an agent to learn in these situations.

#### Curriculum based learning
The simplest way to make it easier for an agent to learn to solve a problem is to make the problem easier. This way the agent is more likely to solve the problem or reach milestones, allowing it to receive rewards to learn from. Once the agent has started to learn and improve, we can then increase the difficulty of the problem. This is learning by curriculum, the same way humans are taught at school. The curriculum should ensure that tasks are challening enough that the agent can learn from the rewards it receives, while also being acheivable so that agent does receive rewards.

Curriculum learning has been used very successfully in a number of legged robotics applications such as: 
- [Hwangbo, J., Lee, J., Dosovitskiy, A., Bellicoso, D., Tsounis, V., Koltun, V. and Hutter, M., 2019. Learning agile and dynamic motor skills for legged robots.](https://www.science.org/doi/10.1126/scirobotics.aau5872)
- [Lee, J., Hwangbo, J., Wellhausen, L., Koltun, V. and Hutter, M., 2020. Learning
quadrupedal locomotion over challenging terrain](https://www.science.org/doi/10.1126/scirobotics.abc5986)
- [Rudin, N., Hoeller, D., Bjelonic, M. and Hutter, M., 2022. Advanced Skills by Learning Locomotion and Local Navigation End-to-End](http://arxiv.org/abs/2209.12827)

Improvements using curriculum learning over learning without a curriculum have been shown by experiments such as: 
- [Qin, B., Gao, Y. and Bai, Y., 2019. Sim-to-real: Six-legged Robot Control with Deep
Reinforcement Learning and Curriculum Learning.](https://ieeexplore.ieee.org/document/9043822)
- [Margolis, G.B., Yang, G., Paigwar, K., Chen, T. and Agrawal, P., 2022. Rapid Locomotion
via Reinforcement Learning](https://arxiv.org/pdf/2205.02824)

Unlike the other approches I'm going to mention, curriculum based learning doesn't require any change to the reinforcement learning algorithm itself, just the environment and/or the task to be learnt. When trying to learn in the real world, it might be challenging to set up a curriculum, but my experiments were in a simulated environment, so I could alter the environment quite easily.

The other two approaches I'm going to talk about, instead of altering the problem to be solved, alter the reinforcement learning algorithm itself, allowing it to generate its own intrinsic rewards to learn from. 

#### Curiosity
One form of intrinsic reward that's proved very effective in reinforcement learning is curiosity. We know that in humans and animals, curiosity is a very important driver of learning; in our own experience, often focusing on a specific problem might yield no results, but by taking time to step away from the problem at hand and just focus on learning, often seemingly unrelated things that we would otherwise have overlooked may help us to solve the problem at hand. Our inbuilt incentive to just learn, which we call curiosity, can be programmed into an RL agent by giving it rewards for exploring and learning. 

Of course we need some way of determining when the agent is learning something new, so we can give it those rewards. One way to do this is to have it learn a model of the problem and the predicted result of actions. When this prediction is wrong, we know that the agent has reach a state where it doesn't know much about the world, so it should be learning a lot. This works surprisingly well. This approach in 2018 allowed a reinforcement learning agent by [a team at OpenAI](https://arxiv.org/pdf/1810.12894) to solve the classic video game "Montezuma's Revenge", which before seemed an almost impossible feat. There is a drawback to this simple curiosity approach though, which is that in some situations the agent will never be able to predict what comes next no matter how much it learns. [The same research group](https://arxiv.org/pdf/1808.04355) used curiosity to successfully teach a simulated robot agent to navigate a maze. They then updated the maze to include a TV on one wall that constantly flashed random images. At first the robot would explore as per usual, but when it reached the TV it would immediately get distracted and just sit there staring at it. While I'm sure we can sympathise with the robot, this is not ideal! Ideally we only want the robot to be interested in things it can learn from. One approach to try to solve this problem is to try to learn a model for randomness within the state, and then reduce the curiosity reward for more random states. Another option is to try to learn a representation of the state that includes only things the agent can control, and use this ignore things it can't.

#### Hierarchical learning
Another approach to improve learning also mimics how learn and specifically how we approach complex problems. When a human has a difficult problem to solve, we break it down into smaller solvable problems, which are solved sequentially. We might even break down each of these smaller problems into smaller problems again. We can follow a similar approach with reinforcement learning, by training multiple agents in a heirarchy. A top level agent breaks the task up into smaller tasks (or subtasks) and calls lower level agents to solve these. Again this can be seen as a form of intrinsic reward since each of the subtasks come with their own rewards as the lower level agents learn to solve them.

One difficulty with this approach is that multiple agents must be trained to solve different subtasks. In traditional reinforcement learning, an agent is trained to only perform a single task, so to train a hierarchical agent in this way, you'd need to know the possible sub-tasks upfront and train agents for each of them, before training your higher level agent. We can simplify this by training our agents to learn what are called "universal" policies. These are policies that take a goal input, which can vary. Thus a policy can be learnt which can solve multiple problems, as long as they can all be defined in the same way. This makes a lot of sense for what I'm trying to do in legged robotics, since it's quite easy to define goals in terms of x and y coordinates for the robot to get to - this way we should train an agent to walk to wherever we want it to go. This also makes it easy to train hierarchical agents. We only need one agent at each level of the hierarchy, which outputs goals for the agent below it. So for my project, the top level agent receives a goal position it needs to get the robot to, and it can then output a series of intermediate locations for a lower level to achieve. In essence, the top level agent can learn to navigate, while the lower level agent learns to walk.

## What I did
As I mentioned above, for my project I wanted to make a robot that was able to walk, and navigate a variety of difficult environments that wouldn't be possible for a wheeled or tracked robot. I wanted to use reinforcement learning to create a controller where it was possible to provide a set of coordinates and have the robot navigate to that location. To aid the robot agent in learning I aimed to use all of the techniques I've mentioned so far, and I was also interested in investigating how these techniques could be used in conjunction with each other.

### My training setup
For my project I didn't have a real-life legged robot. I possibly could have built one, but that's a huge project in itself! So instead I ran my code in a simulated robot environment. The robot I used was a simple "toy" robot that's often used in reinforcement learning. It's called "Ant" and looks like this:

![](/image-server/ant-robot.png)

This is obviously not modelled on any real robot and has simple geometry. It's an eight Degree of Freedom (DOF) robot, with four legs, each of which has a hip joint, which is only capable of moving the thigh from side to side but not up and down, and a knee joint that can flex and extend. 

I simulated the robot in mujoco. This is a lightweight, fast, open source physics simulation engine. It's used quite extensively by scientists working on reinforcement learning for robotics, so I figured this would be a good choice. 

I actually figured out mujoco would be a good choice after spending a huge amount of time trying to get my reinforcement learning simulations to run in Gazebo, which turned out to be a mistake. :/

Gazebo is a large robotics simulation framework built by open robotics. It's also heavily used in the robotics community for testing robots in simulation, but is not really designed for the sort of repeated simulations I was trying to do to train my robot controller. Because it's a much bigger framework, loading it up takes time. It also doesn't have any easy way to reset the simulation back to the beginning, so I ended up closing and reopening the program for each run of my simulation. As well as being slow, I think there's some minor memory leaks or processes it doesn't completely close when you close the program, so after about the 2500th iteration, the computer grinds to a halt - even if you're using one of the massive computers in the university computing cluster! (My own laptop only got to about 90 iterations before giving up!)

With mujoco I could run hundreds of thousands of iterations no problem. If I'd realised this earlier, I'd have saved a ton of time!

The environment I set up to train my robot looked like this:

![](/image-server/0.25.png)

The robot had to learn to get from the blue pillar to the yellow one, and the pillar's positions were different each time. My training regime also increased the difficulty of the task as the robot controller improved; at the start, the two pillars were almost next to each other, on flat ground, whereas later they were much further apart, and the ground was increasingly bumpy and sometimes contained other obstacles.

![](/image-server/Terrain%20Types.png)

### My algorithm
To train my robot I used the Curious Hierarchical Actor Critic algorithm. I adapted the code from the original paper (the code is open source and available on [github](https://github.com/knowledgetechnologyuhh/goal_conditioned_RL_baselines)). This algorithm uses a type of actor critic method called DDPG (Deep Determinisitic Policy Gradient) (see [Open AI's spinning up](https://spinningup.openai.com/en/latest/algorithms/ddpg.html) for more details), built in hierarchies with "universal" policies. It also suppliments this with curiosity, built in the same way as was used by <> to solve Montezuma's Revenge, so the original implementation was already using two of the three methods for improving learning that I mentioned. It even had, as one of the test environments, a similar environemt with the Ant robot attempting to reach a goal, but on flat ground. However the authors didn't attempt to incorportate curriculum learning or more challenging terrain, so I wanted to see how it would fare with my environemt and training regime.

### My results
Here's a video of the robot after being trained for 200,000 episodes.

<video controls width=100%>
  <source src="/image-server/masters_blog_video.mp4" type="video/mp4">
</video>

As you can see, the robot learnt to navigate the easier terrains fairly easily, but it struggled when the terrain got more bumpy, or when there were larger features. I also ran experiments testing how well the robot learnt with and without the different types of training I mentioned before. You can see my full results in my [dissertation writeup](/image-server/DissertationCombined.pdf). I found that by combining all of the three methods did seem to aid improving learning but I found it difficult to unpick the results, which tended to contain a lot of randomness. I think there's definitely room to improve my experimental setup to investigate further the effectiveness of combining these techniques.

Overall my project was quite successful but there are are few things that didn't work out as well as I'd have liked.

I was a little surprised that the robot struggled so much on the bumpier ground. I think the fact that it couldn't move it's hips up and down contributed to this since it has quite limited ability to pick up it's feet. I also only started introducing the larger obstacles at higher difficulties, which the controller rarely reached; I had wanted to find out how well it could learn to navigate these larger obstacles, so this was a disappointment.

## Future
Ok so that was my project for my Masters degree - but in a way it was really just another step in my robotics journey, though a crucial one, that paved the way for future projects. So where do I want to go from here?

Well obviously I want to transfer from a simulation environment to a real robot. But there's a lot to be done to get to that step. 

First, and most obviously, I don't yet have a real legged robot. I suppose I could buy one, but I think I'd prefer to design and make my own. This is going to be a big project.

Secondly, even having a legged robot, there's a lot of functionality my simulation takes for granted. Specifically, the robot controller receives perfect data about the environment around it. In the real world, a robot would need to perceive the environment around it and build an internal model that it can use to plan paths and footholds. I'll need to look into SLAM for this. This is actually something I can do first on my tracked robot, and then port it over to my legged robot when I get to that stage. Of course this still won't be able to provide my robot controller with perfect information about the world, so it'll have to learn to be able to locomote and find paths in an environment it can only partially observe, with errors. There's been some interesting work on how to do this, by training a "teacher" policy on the ground truth state data and then teaching a "student" policy where it's still trained in simulation, but only given partial data to mimic the real world conditions. The student policy instead of learning from scratch, learns to mimic the teacher.

I also want to just improve my robot controller. I was a bit disappointed that I didn't reach the stage of training a controller for a 12 DOF robot, and I was also disappointed that my robot controller never really learnt to navigate the environments with larger features, so those are both areas that I want to continue improving on. Certainly when I make my own robot I'm going to want it to have at least 12 DOF.
`