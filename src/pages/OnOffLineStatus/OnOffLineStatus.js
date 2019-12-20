import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Label, Coord } from 'bizcharts';

class OnOffLineStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          id: '',
          name: '',
          department: '',
          online: false
        }
      ]
    }
  }


  componentDidMount() {
    fetch('/all/onOffShow')
      .then(resp => resp.json())
      .then(jsonResp => {
        if (jsonResp.success) {
          jsonResp.result
          // 按照年级排序
            .sort((user1, user2) => user1['department'] - user2['department'])
            .map((user, index) => {
              user.x = Math.floor(index / 6);
              user.y = index % 6;
            });

          this.setState({
            users: jsonResp.result
          })
        } else {
          console.log('请求失败', jsonResp.message)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {

    const cols = {
      x: {
        type: 'cat',
      },
      y: {
        type: 'cat',
      },
    };
    return (
      <div>
        <Chart
          height={window.innerHeight}
          data={this.state.users}
          scale={cols}
          padding={[window.innerHeight / 10, '3%', window.innerHeight / 3, '3%']}
          forceFit
        >
          <Coord rotate={0}>
            <Geom
              opacity={0.7}
              type="polygon"
              position="y*x"
              color={['online', ['Gainsboro', 'LimeGreen']]}
              style={{
                stroke: '#fff',
                lineWidth: 2,
              }}
            >
              <Label
                content="name"
                offset={-2}
                textStyle={(text, item) => {
                  const style = {
                    fontWeight: 'bold',
                    shadowBlur: 2,
                  };
                  if (item.point.online) {
                    style.fill = '#fff';
                    style.shadowColor = 'rgba(0, 0, 0, .45)'
                  }
                  return style
                }}
              />
            </Geom>
          </Coord>
        </Chart>
      </div>
    );
  }
}

export default OnOffLineStatus
