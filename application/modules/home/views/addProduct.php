<style type="text/css">
    .error{font-size: 14px !important;color: #ff0000 !important;}
    .box_pr{padding: 18px 15px;border-top-color: transparent!important;}
    .box_pr .form-group{margin:18px 0 0 0;}
    
</style>
<?php
    //pr($product_category);
?>
<div class="content-wrapper">
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <div class="col-md-6 col-md-offset-3">
          <!-- general form elements -->
          <div class="box box-primary box_pr">
            <div class="box-header with-border">
              <h3 class="box-title">Add product</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <form id="addProduct" action="<?php echo base_url(); ?>home/addProduct" role="form" enctype="multipart/form-data">
                <div class="box-body">

                    <div class="form-group">
                        <label for="exampleInputEmail1">Product name</label>
                        <input type="text"  class="form-control" id="productName" name="productName">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputFile">Product image</label>
                        <input type="text" readonly="" class="form-control" placeholder="Browse...">
                        <input type="file" id="productImage" name="productImage">
                        <p class="help-block">Select product image...</p>
                    </div> 

                    <div class="form-group">
                        <label for="exampleInputEmail1">Product qty</label>
                        <input type="number"  class="form-control" id="qty" name="qty">
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6">     
                                <label for="exampleInputPassword1">Price</label>
                                <input type="text" class="form-control" id="price" name="price">
                            </div>
                             <div class="col-md-6">
                                <label>Color</label>
                                <select class="form-control sclt-pd" name="color" id="color">
                                    <option></option>
                                    <?php
                                        $color = array('red','green','blue','black','white');
                                        foreach($color as $list){ ?>
                                        <option value="<?php echo $list ; ?>"><?php echo ucfirst($list) ; ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div class="form-group">
                        <div class="row">

                            <div class="col-md-6">     
                                <label for="exampleInputPassword1">Size</label>
                                <input type="text" class="form-control" id="size" name="size">
                            </div>

                             <div class="col-md-6">
                                <label>Select category</label>
                                <select class="form-control sclt-pd" name="brand" id="brand">
                                    <option></option>
                                    <?php
                                    if(!empty($product_category)){

                                        foreach($product_category as $list){ ?>
                                            <option value="<?php echo $list->categoryId ; ?>"><?php echo ucfirst($list->brand_name) ; ?></option>

                                        <?php }

                                    } ?>    
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Description</label>
                        <input type="text" class="form-control" id="description" name="description">
                    </div>   
                </div>

                <div class="box-footer" align="center">
                    <button type="button"  class="btn btn-primary btn-raised btn-flat add_product">Add product</button>
                </div>

            </form>
          </div>
          <!-- /.box -->
        </div>
      </div>
    </section>
</div>