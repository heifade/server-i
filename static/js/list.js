let saveType = 1;
$(document).ready(() => {
  select();

  $(document).on("click", '[name="aEdit"]', e => {
    let rowData = $(e.target).closest("tr")[0].rowData;
    showEdit(rowData);
    saveType = 4;
  });
  $(document).on("click", '[name="aDelete"]', e => {
    let rowData = $(e.target).closest("tr")[0].rowData;
    dDelete(rowData.id);
  });

  $(document).on("click", "#btnAdd", e => {
    saveType = 1;
    showEdit({ id: "", name: "", value: "" });
  });

  $(document).on("click", "#btnSave", e => {
    save();
  });
});

function select() {
  let selectPars = {
    sql: "select * from tbl1",
    where: []
  };

  let req = new Request("/select", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(selectPars)
  });

  fetch(req)
    .then(res => {
      if (res.ok) {
        res.json().then(result => {
          let data = result.data;
          fill(data);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function fill(list) {
  let listBody = $("#listBody");
  listBody.empty();
  list.map(m => {
    let tr = $(
      "<tr><td>" +
        m.id +
        "</td><td>" +
        m.name +
        "</td><td>" +
        m.value +
        "</td><td><a href='javascript:void(0)' name='aEdit'>编辑</a>&nbsp;&nbsp;<a href='javascript:void(0)' name='aDelete'>删除</a></td></tr>"
    );
    listBody.append(tr);
    tr[0].rowData = m;
  });
}

function dDelete(id) {
  let list = [
    {
      database: "test",
      data: {
        id: id
      },
      table: "tbl1",
      saveType: 3
    }
  ];

  let req = new Request("/save", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(list)
  });

  fetch(req)
    .then(res => {
      if (res.ok) {
        res.json().then(result => {
          select();
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function showEdit(rowData) {
  $(".divEdit").show();
  $("#txtId").val(rowData.id);
  $("#txtName").val(rowData.name);
  $("#txtValue").val(rowData.value);
}

function save() {
  let list = [
    {
      database: "test",
      data: {
        id: saveType === 1 ? undefined : $("#txtId").val(),
        name: $("#txtName").val(),
        value: $("#txtValue").val()
      },
      table: "tbl1",
      saveType: saveType
    }
  ];

  let req = new Request("/save", {
    method: "post",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(list)
  });

  fetch(req)
    .then(res => {
      select();
      $(".divEdit").hide();
    })
    .catch(err => {
      console.log(err);
    });
}
