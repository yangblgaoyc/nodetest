$('document').ready(function(){
    const $name = $('#name');
    const $container = $('#container');
    const $data = $('#data');
    var str = "";
    $.ajax({
        url: '/retrieve',
        type: 'GET',
        success: function(result){
            if(result.success){
                var data = result.data;
                $.each(data,function(index,item){
                    console.log(item.name)
                    str += '<li><span>'+item.name+'</span>  <span>删除</span></li>';
                });
                $data.html(str)
            }
            else{
                $container.html('There was a problem.');
            }
        },
        error: function(){
            $container.html('There was a problem.');
        }
    });


    $('#submit').on('click', function(evt){
        evt.preventDefault();
        const data = {
            "name" : $name.val()
        };
        if(!!($name.val())){
            $.ajax({
                url: '/create',
                type: 'POST',
                data: data,
                success: function(result){
                    if(result.success){
                        $container.html('增加数据成功');
                    }
                    else{
                        $container.html('增加数据失败');
                    }
                },
                error: function(){
                    $container.html('系统错误');
                }
            });
        }
        else{
            alert('请填写必要的值')
        }

    });
});