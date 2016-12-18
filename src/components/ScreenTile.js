import React from "react/addons";

var ScreenTile = React.createClass({
    mixins : [React.addons.PureRenderMixin],

    render : function(){        
        var tileStyle = {
            width: this.props.tileSize,
            height: this.props.tileSize,
            backgroundRepeat: 'no-repeat',
            backgroundImage: 'url(' + this.props.imageUrl + ')',
            backgroundPosition: '-' + (this.props.tileSize * this.props.tileCol) + 'px -' + (this.props.tileSize * this.props.tileRow) + 'px' 
        };
        var tileClass = 'screenTile';
        if(this.props.ignore) {
            tileClass += ' ignore';
        }
        return <div className={tileClass} style={tileStyle} onClick={this.onClick}></div>;
    },

    onClick: function(event) {
        if(typeof this.props.onClick === 'function') {
            event.tileData = {
                row: this.props.tileRow,
                col: this.props.tileCol,
                ignore: !this.props.ignore 
            }
            this.props.onClick(event);
        }
    }
});

export default ScreenTile;
