import React from "react/addons";
import ScreenTile from "./ScreenTile";

var ScreenShot = React.createClass({
    mixins : [React.addons.PureRenderMixin],

    getInitialState: function() {
        var maxRows = Math.ceil(this.props.height / this.props.tileSize);
        var maxCols = Math.ceil(this.props.width / this.props.tileSize);
        var ignoreMap = [];

        for(var i=0; i < maxRows; i++)  {
            ignoreMap[i] = [];
            for(var j=0; j < maxCols; j++){
                ignoreMap[i][j] = false;
            }
        }

        return {
            maxCols: maxCols,
            maxRows: maxRows,
            ignoreMap: ignoreMap
        };
    },

    render : function(){
        var items = [];
        var style = {
            width: this.state.maxCols * this.props.tileSize,
            height: this.state.maxRows * this.props.tileSize
        }

        for(var i=0; i < this.state.maxRows; i++)  {
            for(var j=0; j < this.state.maxCols; j++){
                items.push(<ScreenTile 
                    tileRow={i} 
                    tileCol={j} 
                    ignore={this.state.ignoreMap[i][j]}
                    tileSize={this.props.tileSize} 
                    imageUrl={this.props.sourceUrl}
                    onClick={this.onTileClicked} 
                />);
            }
        }
        
        return <div className="screenshot" style={style}>
            {items}
        </div>;
    }, 
    
    onTileClicked: function (event) {
        var ignoreMap = [];

        for(var i=0; i < this.state.maxRows; i++)  {
            ignoreMap[i] = [];
            for(var j=0; j < this.state.maxCols; j++){
                if(i === event.tileData.row && j === event.tileData.col) {
                    ignoreMap[i][j] = event.tileData.ignore;
                } else {
                    ignoreMap[i][j] = this.state.ignoreMap[i][j];
                }
            }
        }
        
        this.setState({
            ignoreMap: ignoreMap
        });

        if(typeof this.props.onIgnoreMapChange === 'function') {
            this.props.onIgnoreMapChange(ignoreMap);
        }
    }
});

export default ScreenShot;
