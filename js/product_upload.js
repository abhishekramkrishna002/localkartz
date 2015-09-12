/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var props_bools = [];
function prop_click(ptr) {
    if (!props_bools[ptr])
    {
        var cntr = ptr + 1;
        var prop_html = "<div class='add_prod_body prod_property prop_style' onclick='prop_click(" + cntr + ")' ><input type='text' placeholder='Name'  style='width:32%' name='param_name'/><select style='width:32%'><option>Item</option><option>Array</option></select><input type='text' placeholder='value' style='width:32%' name='param_value'/></div>";
        $("#prop_container").append(prop_html);
        props_bools[ptr] = !props_bools[ptr]
    }
}
var image_bools = [];
function image_click(ptr) {
    if (!image_bools[ptr])
    {
        var cntr = ptr + 1;
        var image_html = "<div class='add_prod_body prod_image prop_style' onclick='image_click(" + cntr + ")'><input type='text' placeholder='link'  style='width:49%'/><select style='width:49%'><option>Main Image</option><option>angel</option></select></div>";
        $("#image_container").append(image_html);
        image_bools[ptr] = !image_bools[ptr]
    }
}
var app = angular.module('myApp', []);
app.controller('mainCtrl', function ($scope, $http) {
    $scope.publish = function ()
    {
        process_props();
        process_images();
        $scope.product.product_status = "publish";
        $scope.product.date = new Date();
        console.dir($scope.product);
        $scope.product.category = "wearable";
        if (!$scope.product.hasOwnProperty("title") ||
                !$scope.product.hasOwnProperty("description") ||
                !$scope.product.hasOwnProperty("company") ||
                !$scope.product.hasOwnProperty("category") ||
                !$scope.product.hasOwnProperty("sub_category")
                )
        {
            alert("fill all the blanks");
        }
        else
        {
            if (post_data_to_server($scope.product))
            {
                alert("published the product");
            }
            else
            {
                alert("publishing the product failed");
            }
        }
    };
    $scope.save = function ()
    {
        process_props();
        process_images();
        $scope.product.product_status = "draft";
        $scope.product.date = new Date();
        console.dir($scope.product);
        $scope.product.category = "wearable";
        if (!$scope.product.hasOwnProperty("title") ||
                !$scope.product.hasOwnProperty("description") ||
                !$scope.product.hasOwnProperty("company") ||
                !$scope.product.hasOwnProperty("category") ||
                !$scope.product.hasOwnProperty("sub_category")
                )
        {
            alert("fill all the blanks");
        }
        else
        {
            if (post_data_to_server($scope.product))
            {
                alert("saved the product");
            }
            else
            {
                alert("saving the product failed");
            }
        }
    };

    function post_data_to_server(post_data)
    {
        $http({
            url: 'http://192.168.1.10/localkartz/add_product.php',
            method: "POST",
            data: post_data,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            //$scope.users = data.users; // assign  $scope.persons here as promise is resolved here 
            console.dir(data);
            if (data.status == 200)
            {

                $scope.product = {};
                return true;
            }
            else
            {

                //$scope.product={}; 
                return false;
            }


        }).error(function (data, status, headers, config) {
            // $scope.status = status + ' ' + headers;
            console.dir(data);

        });
    }

    function process_images()
    {
        var props = [];
        var properties = $(".prod_image");
        var i = 0;
        for (i = 0; i < properties.length; i++)
        {
            var prop = {};
            var property = properties[i];
            var childs = property.children;
            prop.image_link = childs[0].value;
            prop.image_type = childs[1].value;
            props[i] = prop;

        }
        $scope.product.images = props;
    }
    function process_props()
    {
        var props = [];
        var properties = $(".prod_property");
        var i = 0;
        for (i = 0; i < properties.length; i++)
        {
            var prop = {};
            var property = properties[i];
            var childs = property.children;
            prop.name = childs[0].value;
            prop.value = childs[2].value;
            prop.type = childs[1].value;
            props[i] = prop;

        }
        $scope.product.properties = props;
    }
});

