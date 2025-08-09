export const robotJourneyProject = {
  title: 'The MK1 - A Simple Tracked Robot',
  description: "My first robot build, using a raspberry pi. I have made a series of blog posts documenting the process to build the robot. While it's not intended as a tutorial, I did try to provide enough detail that anyone could follow along and build their own robot. Currently the robot has no intelligence - instead it's controllable over wifi - but I do intend to make it more autonomous in future. This project was on hold for a couple of years while I completed my Masters degree, but I'll be getting back into it soon, so watch this space!",
  image: '/assets/r2-side-compressed.jpeg',
  url: '/projects/mk1-robot'
}

export const mastersProject = {
  title: 'Teaching a Legged Robot to Walk (In Simulation)',
  description: 'For my Masters degree in AI, my final project involved using reinforcement learning to teach a simple simulated legged robot to walk. I aimed to teach the robot to walk across a variety of difficult terrain, using three different methods of improving learning. While this is currently only in simulation, I hope to expand on this legged robot controller alongside building a real life version of the robot to use it on.',
  url: '/projects/legged-robotics',
  image: '/assets/ant-env.png'
}

export const sudokuSolver = {
  title: 'Sudoku Solver',
  description: 'A python project to solve sudokus using contraint propagation and backtracking. Originally done for my Masters degree, I built out a small frontend and have the backend code running in AWS lambda.',
  image:'/assets/Sudoku.png',
  url: '/projects/sudoku-solver'
}

export const gravitySimulator = {
  title: 'Gravity Simulations in the Browser',
  description: "A frontend module to run 2d n-body gravity simulations in the browser. This project was focused on trying to get as much performance as possible. It's not particularly useful for anything, but it looks pretty! I built some node modules which are available on npm, so anyone can use it.",
  image: '/assets/grav-sim-logo.svg',
  url: '/projects/gravity-simulator'
}

export const allProjects = [robotJourneyProject, mastersProject, sudokuSolver, gravitySimulator]
