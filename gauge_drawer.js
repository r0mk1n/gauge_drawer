/**
 * Gauge drawer class
 * @param options
 *
 * @constructor
 */
var GaugeDrawer = function( options ) {
    "use strict";

    this.defaultOptions = {
        canvas          : null,

        // position and size
        left            : 0,
        top             : 0,
        width           : 0,
        height          : 0,

        // values ( min >= current >= max )
        min             : 0,
        max             : 0,
        current         : 0,

        suffix          : '',
        prefix          : '',

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

        prefix_color    : '#a0a0a0',
        prefix_font     : '12px Arial',

        suffix_color    : '#a0a0a0',
        suffix_font     : '12px Arial',

        value_color     : '#000000',
        value_font      : '12px Verdana',

        // type, can be solid | gradient
        type            : 'gradient',

        color           : '#54447C',

        // colormap for gauge chart
        color_map       : [
            { percent:0      , color: '#55BC41' },
            { percent:0.45   , color: '#FFB321' },
            { percent:0.65   , color: '#FFB321' },
            { percent:1      , color: '#D9534F' },
        ]
    };

    // processing options
    this.options = this.defaultOptions;

    if (typeof options !== "undefined") {
        for (var key in this.defaultOptions) {
            if (options.hasOwnProperty(key)) {
                this.options[key] = options[key];
            }
        }
    }

    this.ctx                = null;
    this.color              = null;

    this.radius             = 0;

    this.initialize();
};

GaugeDrawer.prototype = {
    constructor: GaugeDrawer,

    /**
     * Initialize gauge
     */
    initialize: function() {
        this.ctx = this.options.canvas.getContext( '2d' );
        this.radius = ( this.options.width - this.options.thick ) / 2;

        // creating color map
        if ( this.options.type == 'gradient' ) {
            if ( this.options.color_map ) {
                var colorMap = this.ctx.createLinearGradient(
                    this.options.left,
                    0,
                    this.options.left + this.options.width,
                    0
                );
                for ( var i = 0; i < this.options.color_map.length; i++ ) {
                    colorMap.addColorStop( this.options.color_map[i].percent, this.options.color_map[i].color );
                }
                if ( colorMap ) {
                    this.color = colorMap;
                }
            } else {
                this.color = this.options.color;
            }

        } else {
            this.color = this.options.color;
        }

        this.update( this.options.current ? this.options.current : 0 );
    },

    /**
     * Update gauge status
     * @param value
     */
    update: function( value ) {
        // draw background
        this.ctx.shadowBlur = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowOffsetX = 0;

        this.drawGauge( this.options.bg_color, 1 );

        // draw gauge
        var percent = ( value / this.options.max * 100 ) / 100;
        this.ctx.shadowBlur = this.options.shadow_blur;
        this.ctx.shadowColor = this.options.shadow_color;
        this.ctx.shadowOffsetY = this.options.shadow_offset_y;
        this.ctx.shadowOffsetX = this.options.shadow_offset_x;
        this.drawGauge( this.color, percent );

        // draw text
        this.drawText( value );
    },

    /**
     * Draw gauge
     * @param color
     * @param value
     */
    drawGauge: function( color, value ) {
        var start_deg = -Math.PI,
            end_deg = -Math.PI + Math.PI * 2 * ( value / 2 );

        this.ctx.beginPath();
        this.ctx.arc(
            this.options.left + 2 + this.options.width / 2,
            this.options.top + this.options.height,
            this.radius - 2,
            start_deg,
            end_deg,
            false
        );
        this.ctx.strokeStyle = color;
        this.ctx.lineCap = 'round'; // butt, round or square
        this.ctx.lineWidth = this.options.thick;
        this.ctx.stroke();
    },

    /**
     * Draw text
     * @param color
     * @param text
     */
    drawText: function( text ) {
        this.ctx.font = this.options.value_font;
        var value_width = this.ctx.measureText( this.options.prefix + text + this.options.suffix );

        this.ctx.fillText( this.options.prefix + text + this.options.suffix, this.options.left + ( this.options.width / 2.0 - value_width.width / 2.0 ), this.options.top + this.options.height + 5  );

    }
}

