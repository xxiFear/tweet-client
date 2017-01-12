import {inject} from 'aurelia-framework';
// import {TotalUsers} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from '../../services/tweet-service';
import {TotalUsers} from '../../services/messages'
import * as d3 from 'd3';

@inject(EventAggregator, TweetService)
export class Stats {

  users = [];

  constructor(eventAggregator, tweetService) {
    this.eventAggregator = eventAggregator;
    this.tweetService = tweetService;
    this.eventAggregator.subscribe(TotalUsers, message => {
      this.users = message.users;
    });
  }

  activate(params) {
  }

  attached() {
    this.tweetService.getAllUsers().then(users => {
      let object = this.createNodesAndLinks(this.users);
      let nodes = object.nodes;
      let links = object.links;
      this.renderGraph(nodes, links);
    });
  }

  createNodesAndLinks(users) {
    let nodes = {};
    let links = [];
    users.forEach(user => {
      nodes[user.firstName + user.lastName] = {
        id: user.firstName + user.lastName,
        firstName: user.firstName,
        lastName: user.lastName,
        icon: user.gender === 'Male' ? '/src/assets/avatars/christian.jpg'
            : '/src/assets/avatars/kristy.png'
      };
      if (user.following !== null) {
        user.following.forEach(followedUser => {
          links.push({
            source: user.firstName + user.lastName,
            target: followedUser.firstName + followedUser.lastName,
            type: 'blue'
          }
          );
        });
      }
    });
    let object = {nodes, links};
    return object;
  }

  renderGraph(nodes, links) {
    // let links = [
    //   {source: 'Matthias', target: 'Sabrina', type: 'blue'},
    //   {source: 'Sabrina', target: 'Matthias', type: 'blue'}
    // ];
    // //
    // let nodes = {
    //   'Matthias': {
    //     name: 'Matthias', icon: '/src/assets/avatars/christian.jpg'
    //   },
    //   'Sabrina': {
    //     name: 'Sabrina', icon: '/src/assets/avatars/kristy.png'
    //   }
    // };

    //Compute the distinct nodes from the links.
    links.forEach(function (link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    let width = 960;
    let height = 500;

    let force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        //Distance between linked circles
        .linkDistance(100)
        .charge(-300)
        .on('tick', tick)
        .start();

    let svg = d3.select('#content').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Per-type markers
    svg.append('defs').selectAll('marker')
        .data(['blue'])
        .enter().append('marker')
        .attr('id', function (d) {
          return d;
        })
        .attr('viewBox', '0 -5 10 10')
        //refX and refY describe the markers position
        //(Must be changed as soon as radius of circle changes
        .attr('refX', 25)
        .attr('refY', -3.5)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5');

    let path = svg.append('g').selectAll('path')
        .data(force.links())
        .enter().append('path')
        .attr('class', function (d) {
          return 'link ' + d.type;
        })
        .attr('marker-end', function (d) {
          return 'url(#' + d.type + ')';
        });

    let defs = svg.append('svg:defs');

    //Pattern for image
    defs.selectAll('.patterns')
        .data(force.nodes())
        .enter().append('pattern')
        .attr('id', function (d) {
          return (d.id + '-icon');
        })
        .attr('width', '40')
        .attr('height', '40')
        .append('svg:image')
        .attr('xlink:href', function (d) {
          return (d.icon);
        })
        .attr('width', 40)
        .attr('height', 40);
    // .attr('x', 0)
    // .attr('y', 0);

    let circle = svg.append('g').selectAll('circle')
        .data(force.nodes())
        .enter().append('circle')
        .attr('class', 'logo')
        .attr('r', 20)
        .style('fill', 'transparent')
        .style('stroke', 'black')
        .style('stroke-width', 0.25)
        .style('fill', function (d) {
          return 'url(#' + d.id + '-icon)';
        })
        // .style('fill', 'url(#' +  + ')')
        // .on('mouseover', function(){
        //   d3.select(this)
        //       .style('fill', 'url(#avatar)');
        // })
        // .on('mouseout', function(){
        //   d3.select(this)
        //       .style('fill', 'transparent');
        // })
        .call(force.drag);


    let text = svg.append('g').selectAll('text')
        .data(force.nodes())
        .enter().append('text')
        //X Position of Name, must be at least the size of circle radius
        .attr('x', 20)
        .attr('y', '.100em')
        .text(function (d) {
          return d.firstName + ' ' + d.lastName;
        });

    // Use elliptical arc path segments to doubly-encode directionality.
    function tick() {
      path.attr('d', linkArc);
      circle.attr('transform', transform);
      text.attr('transform', transform);
    }

    function linkArc(d) {
      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;
      let dr = Math.sqrt(dx * dx + dy * dy);
      return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
    }

    function transform(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    }
  }

}
