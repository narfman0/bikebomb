var BootstrapTable = ReactBootstrapTable.BootstrapTable;
var TableHeaderColumn = ReactBootstrapTable.TableHeaderColumn;

$.getJSON( "/api/models/", function(data) {
  ReactDOM.render(
    <BootstrapTable data={data.results} pagination={true}>
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
    </BootstrapTable>,
  document.getElementById("content")
  );
})
