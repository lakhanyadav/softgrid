<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<h2>User Info</h2>

<table>
	<tr>
	    <th>Name</th>
	    <th>Total Requests </th>
	    <th>Total Requests His Partners</th>
  	</tr>
	<?php 

		if(!empty($list)){
			foreach($list as $val){ ?>

				<tr>
			    	<td><?php echo $val->full_name; ?></td>
			    	<td><?php echo $val->total_request->requestcount; ?></td>
			    	<td><?php echo $val->patners; ?></td>
			  </tr>

				<?php
			 } ?>
			<?php 
		}else{ ?>
			<tr>
			    	<td>No Record Found.</td>
			    	
			  </tr>
			<?php  
		}
	?>
  
</table>