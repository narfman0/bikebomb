var BootstrapTable = ReactBootstrapTable.BootstrapTable;
var TableHeaderColumn = ReactBootstrapTable.TableHeaderColumn;
var BikeTable = React.createClass({
  loadNextModelPage: function() {
    var modelPage = this.state.modelPage;
    var models = this.state.models;
    var url = this.props.url + '?page=' + modelPage;
    $.getJSON(url, function(data) {
      models = models.concat(data.results);
      this.setState({models: models, modelPage: modelPage + 1});
      if(data.next){
        setTimeout(function(){
          this.loadNextModelPage();
        }.bind(this), 0);
      }
    }.bind(this));
  },
  componentDidMount: function() {
    this.loadNextModelPage();
  },
  getInitialState: function() {
    return {models: [], modelPage: 1};
  },
  render: function() {
    return (
      <BootstrapTable data={this.state.models} pagination={true} striped={true} hover={true} condensed={true}>
          <TableHeaderColumn dataField="id" isKey={true}>Product ID</TableHeaderColumn>
          <TableHeaderColumn
            dataField="make" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Make
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="name" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Model
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="years" filter={{type: "TextFilter", placeholder: "Please enter a value"}}>
            Years
          </TableHeaderColumn>
      </BootstrapTable>
    );
  }
});
ReactDOM.render(
  <BikeTable url="/api/models/" />,
  document.getElementById("content")
);
