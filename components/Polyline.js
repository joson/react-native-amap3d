import React, {PropTypes, Component} from 'react'
import {processColor, requireNativeComponent, View, PixelRatio, Platform} from 'react-native'
import {LatLng} from './PropTypes'

class Polyline extends Component {
  static propTypes = {
    ...View.propTypes,

    coordinates: PropTypes.arrayOf(LatLng).isRequired,
    width: PropTypes.number,
    color: PropTypes.string,
    zIndex: PropTypes.number,

    /**
     * 多段颜色
     */
    colors: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.string),
    ]),

    /**
     * 是否使用颜色渐变
     */
    gradient: PropTypes.bool,

    /**
     * 是否绘制大地线
     */
    geodesic: PropTypes.bool,

    /**
     * 是否绘制虚线
     */
    dashed: PropTypes.bool,

    /**
     * 点击事件
     */
    onPress: PropTypes.func,
  }

  static defaultProps = {
    colors: [],
  }

  _handle(name) {
    return event => {
      if (this.props[name]) {
        this.props[name](event)
      }
    }
  }

  render() {
    const props = {
      ...this.props,
      ...Platform.select({
        android: {
          width: PixelRatio.getPixelSizeForLayoutSize(this.props.width),
          colors: this.props.colors.map(processColor),
        },
      }),
      onPolylineClick: this._handle('onPress'),
    }
    return <AMapPolyline {...props}/>
  }
}

AMapPolyline = requireNativeComponent('AMapPolyline', Polyline)

export default Polyline
