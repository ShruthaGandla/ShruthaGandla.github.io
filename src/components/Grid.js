import React from "react";
import '../css/style.css'

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.rows = 100;
        this.columns = 100;

        // generate a 2d game helper array to store the status of cell alive/dead
        this.gameHelper = Array(this.rows);

        for (let i = 0; i < this.gameHelper.length; i++) {
            this.gameHelper[i] = Array(this.columns);
        }
        for(let i = 0; i<this.rows.length; i++){
            for(let  j = 0; j<this.columns.length; j++){
                // cells are all dead in the beginning.
                this.gameHelper[i][j] = false;
            }
        }
        this.state = {
            fullGrid: []
        }
    }

    componentDidMount() {
        this.initialGame();
    }

    initialGame(){
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.columns; j++) {
                // change the cell status to alive based on the random genrator
				if (Math.floor(Math.random()*3) === 1) {
					this.gameHelper[i][j] = true;
				}
			}
		}
        this.setState({
            fullGrid: this.generateAllCells()
        })
    }

    // the following function generates the grid UI, based on the cell status is alive or dead
    generateAllCells(){
         // At times react will not consider a state change if the original values are mutated.like Array.push
        // better make a clone, new array/non-muating way to update a state and re-render.

        const girdWithCells = Array(this.rows);

        for (let i = 0; i < girdWithCells.length; i++) {
            girdWithCells[i] = Array(this.columns);
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                // alternate to update the className directly.
                girdWithCells[i][j] = <div className={this.gameHelper[i][j] ? 'cell alive' : 'cell dead'} key={i + '-' + j} onClick={(event) => this.cellClicked({ row: i, column: j }, event)}></div>
            }
        };

        return girdWithCells;

    }

   
    
    play = () => {

		for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.columns; j++) {

            let numberOfCellsAlive = 0;
            
            if (i > 0) if (this.gameHelper[i - 1][j]) numberOfCellsAlive++;
            
            if (i > 0 && j > 0) if (this.gameHelper[i - 1][j - 1]) numberOfCellsAlive++;
            
		    if (i > 0 && j < this.columns - 1) if (this.gameHelper[i - 1][j + 1]) numberOfCellsAlive++;
		    if (j < this.columns - 1) if (this.gameHelper[i][j + 1]) numberOfCellsAlive++;
		    if (j > 0) if (this.gameHelper[i][j - 1]) numberOfCellsAlive++;
		    if (i < this.rows - 1) if (this.gameHelper[i + 1][j]) numberOfCellsAlive++;
		    if (i < this.rows - 1 && j > 0) if (this.gameHelper[i + 1][j - 1]) numberOfCellsAlive++;
            if (i < this.rows - 1 && j < this.columns - 1) if (this.gameHelper[i + 1][j + 1]) numberOfCellsAlive++;
            

		    if (this.gameHelper[i][j] && (numberOfCellsAlive < 2 || numberOfCellsAlive > 3)) this.gameHelper[i][j] = false;
		    if (!this.gameHelper[i][j] && numberOfCellsAlive === 3) this.gameHelper[i][j] = true;
		  }
		}
        this.setState({
            fullGrid: this.generateAllCells()
        })

	}

    render() {
        return (
            <div className='grid'>
                <h1>Game Of Life</h1>
                <div>{this.state.fullGrid}</div>
                <button onClick={this.play}>Play</button>
            </div>
        )
    }
}

export default Grid;