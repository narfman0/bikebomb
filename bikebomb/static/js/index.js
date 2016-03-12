var BootstrapTable = ReactBootstrapTable.BootstrapTable;
var TableHeaderColumn = ReactBootstrapTable.TableHeaderColumn;
var BikeTable = React.createClass({
  loadNextModelGroup: function(limit) {
    var modelOffset = this.state.modelOffset;
    var models = this.state.models;
    var url = this.props.modelUrl + '?offset=' + modelOffset + '&limit=' + limit;
    $.getJSON(url, function(data) {
      models = models.concat(data.results);
      this.setState({models: models, modelOffset: modelOffset + data.results.length});
      if(data.next){
        setTimeout(function(){
          this.loadNextModelGroup(1000);
        }.bind(this), 0);
      }else{
        this.loadNextStatGroup();
      }
    }.bind(this));
  },
  loadNextStatGroup: function() {
    var statOffset = this.state.statOffset;
    var models = this.state.models;
    var url = this.props.statUrl + '?offset=' + statOffset + '&limit=' + 10000;
    $.getJSON(url, function(data) {
      for(var i=0; i<data.results.length; i++){
        var stat = data.results[i]
        if(/torque/i.test(stat.name)){
          stat.name = 'torque';
        }else if(/capacity/i.test(stat.name)){
          stat.name = 'capacity';
        }
        models[stat.model-1][stat.name] = stat.value;
      }
      this.setState({models: models, statOffset: statOffset + data.results.length});
      if(data.next){
        setTimeout(function(){
          this.loadNextStatGroup();
        }.bind(this), 0);
      }
    }.bind(this));
  },
  componentDidMount: function() {
    this.loadNextModelGroup(100);
  },
  getInitialState: function() {
    return {models: [], modelOffset: 0, statOffset: 0};
  },
  render: function() {
    return (
      <BootstrapTable data={this.state.models} pagination={true} striped={true} hover={true} condensed={true}>
          <TableHeaderColumn dataSort={true}
            dataField="make" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Make
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true} isKey={true}
            dataField="name" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Model
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true}
            dataField="year_start" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Year Start
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true}
            dataField="year_end" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Year End
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true}
            dataField="cost" filter={{type: "NumberFilter", placeholder: "Please enter a value"}}>
            Cost
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true}
            dataField="torque" filter={{type: "NumberFilter", placeholder: "Please enter a value"}}>
            Torque
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true}
            dataField="capacity" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Capacity
          </TableHeaderColumn>
          <TableHeaderColumn dataSort={true}
            dataField="weight" filter={{type: "NumberFilter", placeholder: "Please enter a value"}}>
            Weight
          </TableHeaderColumn>
      </BootstrapTable>
    );
  }
});
ReactDOM.render(
  <BikeTable modelUrl="/api/models/" statUrl="/api/stats/" />,
  document.getElementById("content")
);
