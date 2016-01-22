<!DOCTYPE html>
<html ng-app="game">
  <head>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/bootstrap.min.css') }}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/choice.css') }}" />
    <script type="text/javascript" src="{{ asset('angular/angular.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('scripts/choice.js') }}"></script>
  </head>
  <body ng-controller="GameController as game">
    <div align="center" class="page-header">
      <h2><%game.title%></h2>
      <em><%game.instructions%></em>
    </div>
    <div class="side-div left">
    <ul class="list-group">
      <li class="list-group-item asset-li" ng-repeat="person in game.people">
        <h3><%person.name%></h3>
        <p ng-class="{danger: person.fatigue >= 7, dead: person.fatigue >= 10}">Fatigue: <%person.fatigue%></p>
        <strong><%person.motivation1%></strong> &nbsp;&nbsp;<br />
        <span ng-repeat="num in game.thresholds" ng-class="{threshold_active: person.threshold == num}">&nbsp;<%num%>&nbsp;</span> 
        &nbsp;&nbsp;
        <br /><strong><%person.motivation2%></strong>
    </li>
  </ul>
  </div>
  <div class="side-div right" align="center">
    <h3><%game.choices[game.index].title%></h3>
    <p class="description"><%game.choices[game.index].description%></p>
    <h4><em>What do you do?</em></h4>
    <ul class="list-group options-ul" id="choices" ng-hide="game.choosing == 1">
        <li class="list-group-item" ng-repeat="option in game.choices[game.index].options">
          <button ng-click="game.choose($index)" class="choose"><h4><%option.name%></h4></button>
          <h6><em><%option.hint%></em></h6>
        </li>
      </ul>
    
    <div ng-hide="game.choosing == 0">
      <p class="description">
          <em><%game.choices[game.index].options[game.optionIndex].description%></em>
        </p>
        <p>
          <ul class="list-group">
            <li class="list-group-item" ng-repeat="person in game.choices[game.index].options[game.optionIndex].people">
              <strong class="large-text"><%this.game.people[person.person_id].name%></strong> got <%person.fatigue > 0 ? '+' : ''%><%person.fatigue%> fatigue
              <span ng-show="person.motivation1 > 0">
                and +<%person.motivation1%> <strong>"<%this.game.people[person.person_id].motivation1%>"</strong> <em class="small-text">(-<%person.motivation1%> <%this.game.people[person.person_id].motivation2%>)</em>
              </span>
              <span ng-show="person.motivation2 > 0">
                and +<%person.motivation2%> <strong>"<%this.game.people[person.person_id].motivation2%>"</strong> <em class="small-text">(-<%person.motivation2%> <%this.game.people[person.person_id].motivation1%>)</em>
              </span> 
            </li>
          </ul>
        </p>
        <br />
        <div align="center" ng-hide="game.over == 0">
          <h2>GAME OVER</h2>
          <h4><em>sorry about that...</em></h4>
          <button ng-click="game.restart()" class="choose"><h4>Restart</h4></button>
        </div>
        <button ng-click="game.next()" class="choose" ng-hide="game.over == 1"><h4>Keep Flyin'</h4></button>
    </div>
  </div>
  </body>
</html>