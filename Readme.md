<img src="http://d324imu86q1bqn.cloudfront.net/uploads/user/avatar/641/large_Ello.1000x1000.png" width="200px" height="200px" />

# Ello Brains

[![Build Status](https://travis-ci.org/ello/brains.svg?branch=master)](https://travis-ci.org/ello/brains)

The shared library for ello's react based applications [webapp](http://github.com/ello/webapp) and some other internal tools.

## Working with brains

In order to work with brains locally you will need to link it to your brains
consuming project(eg: webapp). There is a default script to link/unlink the
webapp as long as brains and webapp have the same parent directory.

- `yarn link-webapp` - will link your local brains module to your local webapp
  and allow for hot reloading of brains into the webapp due to webapp's development
  webpack configuration.
- `yarn unlink-webapp` - will unlink the local brains module and replace it with
  http://github.com/ello/brains, which is what is current on master.

Always be sure to run `yarn build:watch` when working locally so your changes
are picked up in linked projects. Also, make sure that you commit up the
compiled files to master to get updates pushed across the shared apps.

## Code of Conduct
Ello was created by idealists who believe that the essential nature of all human beings is to be kind, considerate, helpful, intelligent, responsible, and respectful of others. To that end, we will be enforcing [the Ello rules](https://ello.co/wtf/policies/rules/) within all of our open source projects. If you don’t follow the rules, you risk being ignored, banned, or reported for abuse.

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/ello/brains.

## License
Ello Brains is released under the [MIT License](/LICENSE.txt)

