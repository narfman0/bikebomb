var BootstrapTable = ReactBootstrapTable.BootstrapTable;
var TableHeaderColumn = ReactBootstrapTable.TableHeaderColumn;
var BikeTable = React.createClass({
  loadNextModelPage: function() {
    var modelPage = this.state.modelPage;
    var models = this.state.models;
    var url = this.props.modelUrl + '?page=' + modelPage;
    $.getJSON(url, function(data) {
      models = models.concat(data.results);
      this.setState({models: models, modelPage: modelPage + 1});
      if(data.next){
        setTimeout(function(){
          this.loadNextModelPage();
        }.bind(this), 0);
      }else{
        this.loadNextStatPage();
      }
    }.bind(this));
  },
  loadNextStatPage: function() {
    var statPage = this.state.statPage;
    var models = this.state.models;
    var url = this.props.statUrl + '?page=' + statPage;
    $.getJSON(url, function(data) {
      for(var i=0; i<data.results.length; i++){
        var stat = data.results[i]
        if(/torque/i.test(stat.name)){
          stat.name = 'torque';
        }else if(/(wet weight|unladen weight)/i.test(stat.name)){
          stat.name = 'weight';
        }else if(/capacity/i.test(stat.name)){
          stat.name = 'capacity';
        }
        models[stat.model-1][stat.name] = stat.value;
      }
      this.setState({models: models, statPage: statPage + 1});
      if(data.next){
        setTimeout(function(){
          this.loadNextStatPage();
        }.bind(this), 0);
      }
    }.bind(this));
  },
  componentDidMount: function() {
    this.loadNextModelPage();
  },
  getInitialState: function() {
    return {models: [], modelPage: 1, statPage: 1};
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
            dataField="years" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Years
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
