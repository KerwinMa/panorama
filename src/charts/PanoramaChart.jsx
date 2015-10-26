import React, { PropTypes } from 'react';

const BASE_CLASS_NAME = 'panorama chart ';

export default class PanoramaChart extends React.Component {

  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
    width: PropTypes.number,
    height: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
    axisProps: PropTypes.shape({
      scale: PropTypes.func,
      ticks: PropTypes.number,
      orient: PropTypes.string,
      offset: PropTypes.array
    })
  }

  static defaultProps = {
    data: [],
    width: 600,
    height: 400,
    margin: {
      top: 20,
      right: 30,
      bottom: 20,
      left: 30
    },
    xScale: d3.scale.linear(),
    yScale: d3.scale.linear(),
    xAccessor: d => d.key,
    yAccessor: d => d.value,
    axisProps: {
      scale: d3.scale.linear(),
      ticks: 5,
      xOrient: 'bottom',
      yOrient: 'left',
      offset: [0, 0]
    }
  }

  constructor (props) {

    super(props);

    console.log('>>>>> axisProps:', props.axisProps);

  }

  componentDidMount () {

    this.update();

  }

  componentWillUnmount () {

    if (this.chart) this.chart.destroy(this.refs.chart);
    this.chart = null;

  }

  componentDidUpdate () {

    this.update();

  }

  update () {

    if (!this.chart) {
      this.chart = new this.chartConstructor(d3.select(this.refs.chart), this.props);
    }

    if (this.chart.updateConfigs) {
      this.chart.updateConfigs(this.props);
    }

    this.chart.draw(this.props.data);

  }

  /**
   * Determine class name to be appended to container element.
   * Typically overridden by subclasses.
   */
  getClassSuffix () {

    return '';
    
  }

  render () {

    return (
      <div className={ BASE_CLASS_NAME + this.getClassSuffix() }>
        <svg ref='chart' className='wrapper'></svg>
      </div>
    );

  }

}
