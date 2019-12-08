import React, {Component} from 'react'
import Rectangle from './Rectangle'
class TimeLine extends Component{

    render() {
        return(
                <svg width={"100%"} height={"10px"}>
                    <rect width={"100%"} fill={"Gainsboro"}/>
                        {
                            this.props.segments.map((segment) =>
                                <Rectangle key={segment.onLine.toString()} x={(segment.onLine - 7 * 60)/ (17 * 60) * 100 + '%'}
                                           width={(segment.offLine - segment.onLine) / (17 * 60) * 100 + '%'}
                                           fill={"LimeGreen"} />
                            )
                        }
                </svg>
        )
    }
}

export default TimeLine
