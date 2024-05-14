<h3>Form List</h3>
<hr class="border-primary">
<div class="col-md-12">
    <table id="forms-tbl" class="table table-stripped">
        <thead>
            <tr>
                <th>#</th>
                <th>Date & Time</th>
                <th>Code</th>
                <th>Title</th>
                <th>URL</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php 
            $i = 1;
                $forms = $db->conn->query("SELECT * FROM `form_list` order by date(date_created) desc");
                while($row = $forms->fetch_assoc()):
            ?>
                <tr>
                    <td class="text-center"><?php echo $i++ ?></td>
                    <td><?php echo date("M d, Y h:i A",strtotime($row['date_created'])) ?></td>
                    <td><?php echo $row['form_code'] ?></td>
                    <td><?php echo $row['title'] ?></td>
                    <td><a href="./form.php?code=<?php echo $row['form_code'] ?>">form.php?code=<?php echo $row['form_code'] ?></a></td>
                    <td class=''>
                        <a href="./index.php?p=view_form&code=<?php echo $row['form_code'] ?>" class="btn btn-default border">View</a>
                        <a href="./index.php?p=view_responses&code=<?php echo $row['form_code'] ?>" class="btn btn-default border">Responses</a>
                        <a href="javascript:void(0)" class="btn btn-default border rem_form" data-id='<?php echo $row['form_code'] ?>'><span class="fa fa-trash text-danger"></span></a>
                    </td>
                </tr>
            <?php endwhile;  ?>
        </tbody>
    </table>
</div>
<script>
    $(function(){
        $('#forms-tbl').dataTable();
        $('.rem_form').click(function(){
            start_loader();
            var _conf = confirm("Are you sure to delete this data?")
            if(_conf == true){
                $.ajax({
                    url:'classes/Forms.php?a=delete_form',
                    method:'POST',
                    data:{form_code: $(this).attr('data-id')},
                    dataType:'json',
                    error:err=>{
                        console.log(err)
                        alert("an error occured")
                    },
                    success:function(resp){
                        if(resp.status == 'success'){
                            alert("Data successfully deleted");
                            location.reload()
                        }else{
                            console.log(resp)
                        alert("an error occured")
                        }
                    }
                })
            }
            end_loader()
        })
    })
</script>