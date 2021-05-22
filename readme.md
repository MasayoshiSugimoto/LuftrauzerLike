How to start the game
=====================

Click [here](https://masayoshisugimoto.github.io/LuftrauzerLike/LuftrauzerLike.html) to test the demo.

Launch _LuftrauzerLike.html_ in Chrome.

On the title screen, press _Enter_ to start the game.

Controls
========

| W     | Boost      |
|-------|------------|
| A     | Turn left  |
| D     | Turn right |
| SPACE | Fire       |


Notes
=====

- Represent base coordinates in a specific vector { x: angle, y: number }
- Projection to flat space where player is centered.
- We want to keep calculation in flat space as much as possible.
- We introduce a projection step between physics update and graphics update.
  User will be at the origin of the space after being projected through the
  cylinder space.

FlatSpace -> cylinderSpsace -> FlatSpace -> GraphicSpace

