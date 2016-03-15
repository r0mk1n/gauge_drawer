# gauge_drawer
Simple js class for gauge drawing

## How to use
1) load script
````    
    <script src="js/gauge_drawer.js"></script>
````
2) create canvas
````
<body>
    <canvas width="330" height="100" id="canvas" style="width:330px; height:100px;"></canvas>
    ...
````
3) initialize canvas from JS
````
<script>
    var canvas = document.getElementById('canvas');
    canvas.width = 330;
    canvas.height = 100;
    // ...
````
4) create drawers, you can use as many drawers as you want on one canvas ;)
````
    var gauge1 = new GaugeDrawer({
        canvas: canvas,

        left        : 0,
        top         : 0,
        width       : 100,
        height      : 50,

        suffix      : '°C',

        min         : 0,
        max         : 300,
        current     : 20
    });
    var gauge2 = GaugeDrawer({
        canvas: canvas,

        left        : 110,
        top         : 0,
        width       : 100,
        height      : 50,

        suffix      : '°F',

        min         : 0,
        max         : 300,
        current     : 100
    });
````

### options
````
    {
        // drawer position on canvas
        left            : 0,
        top             : 0,
        width           : 0,
        height          : 0,

        // values ( min >= current >= max )
        min             : 0,
        max             : 0,
        current         : 0,

        // suffix and prefix values
        suffix          : '',
        prefix          : '',
        
        // not yet used
        title           : '',

        // graphic settings
        thick           : 15,

        // gauge shadow settings
        shadow_blur     : 3,
        shadow_color    : "rgba(0,0,0,.5)",
        shadow_offset_x : 1,
        shadow_offset_y : 1,

        // colors and styles
        bg_color        : '#efefef',

        // prefix, drawing before value
        prefix_color    : '#a0a0a0',
        prefix_font     : '12px Arial',

        // suffix, drawing after value
        suffix_color    : '#a0a0a0',
        suffix_font     : '12px Arial',

        // value
        value_color     : '#000000',
        value_font      : '12px Verdana',

        // type, can be solid | gradient
        type            : 'gradient',

        // color for solid type 
        color           : '#54447C',

        // colormap for gradient type
        color_map       : [
            { percent:0      , color: '#55BC41' },
            { percent:0.45   , color: '#FFB321' },
            { percent:0.65   , color: '#FFB321' },
            { percent:1      , color: '#D9534F' },
        ]
    }
````
