import React from "react/addons";
import ScreenShot from "./ScreenShot";
import 'whatwg-fetch';

var Root = React.createClass({
    mixins : [React.addons.PureRenderMixin],
    
    getInitialState: function() {
        return {
            screenResult: null,
            blockSize: 20
        };
    },

    componentWillMount : function() {
        var resultURL = '/get-result/LoginScreen/initial';
        fetch(resultURL)
        .then(function(response) {
            if(response.ok && response.status === 200) { 
                return response.json();
            }
        })
        .then(this.onScreenResultRecieved)
        .catch(this.onScreenResultErrorRecieved);
    }, 

    render : function(){
        var sourceURL = 'LoginScreen---initial.png';
        var content = <div>Loading Files</div>
        if(this.state && this.state.screenResult) {
            content = <div>
                
                
                <ScreenShot 
                    sourceUrl={sourceURL} 
                    tileSize={this.state.blockSize} 
                    width={this.state.screenResult.width}
                    height={this.state.screenResult.height}
                    onIgnoreMapChange={this.onIgnoreMapChange}
                ></ScreenShot>
                <div className="control-panel">
                    <h1 className="header">
                        Screen Shot test Builder <br/>
                        <small>v1.0 alpha</small>
                    </h1>
                    <h3>
                        {this.state.screenResult.screen}
                        <br/>
                        <small>{this.state.screenResult.state}</small>
                    </h3>
                    <h1>{this.state.screenResult.changeDelta.toFixed(2)}%</h1>
                    <small>change</small>
                    <div className="action-panel">
                        Block Size: 
                        <input 
                            id="blockSizeInput" 
                            type="number" 
                            min="5"
                            defaultValue={this.state.blockSize}
                            onChange={this.onBlockSizeChanged} 
                        />
                        <input type="range" min="0" max="100" defaultValue="100"/>
                    </div>

                </div>
            </div>;
        }
        
        return <div>
            {content}
        </div>
    },

    onIgnoreMapChange: function(ignoreMap) {

    },

    onBlockSizeChanged: function(event) {
        if(parseInt(event.target.value) >= 5) {
            this.setState({
                blockSize: parseInt(event.target.value)
            });
        } 
    },

    onScreenResultRecieved: function(response) {
        this.setState({
            screenResult: response,
            blockSize: response.blockSize
        });
    },

    onScreenResultErrorRecieved: function(error) {
        console.log('error', error.message);
        console.log(error.stack);
    }

});

export default Root;