$('document').ready(function(){
    const $name = $('#name');
    const $container = $('#container');
    const $data = $('#data');
    var str = "";
    //查询
    $.ajax({
        url: '/retrieve',
        type: 'GET',
        success: function(result){
            if(result.success){
                var data = result.data;
                $.each(data,function(index,item){
                    console.log(item.name)
                    str += '<li><span>'+item.name+'</span>  <span class="del" id="'+item._id+'">删除</span> <input type="text" > <span class="update" id="'+item._id+'">更新</span></li>';
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

    //更新
    $data.on('click','.update',function(){
        const data = {
            "name" : $(this).prev().val(),
            "id" : $(this).attr('id')
        };
        console.log(data.name, data.id)
        if($(this).prev().val()){
            $.ajax({
                url: '/update',
                type: 'POST',
                data: data,
                success: function(result){
                    if(result.success){
                        $container.html('修改数据成功');
                    }
                    else{
                        $container.html('修改数据失败');
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

    //删除
    $data.on('click','.del',function(){
        const data = {
            "id" : $(this).attr('id')
        };
        $.ajax({
            url: '/del',
            type: 'POST',
            data: data,
            success: function(result){
                if(result.success){
                    $container.html('删除数据成功');
                }
                else{
                    $container.html('删除数据失败');
                }
            },
            error: function(){
                $container.html('系统错误');
            }
        });
    });

    //增加
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