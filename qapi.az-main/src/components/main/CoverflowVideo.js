import React from "react";
import SwipeableViews from "react-swipeable-views";
import Animated from "animated/lib/targets/react-dom";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from "@material-ui/icons";

const styles = {
  slide: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  img: {
    objectFit: "contain",
    maxWidth: "90%",
    maxHeight: "90%",
    display: "block",
    marginBottom: 16,
  },
};

class CoverflowVideo extends React.Component {
  constructor(props) {
    super(props);
    this.checkKey = this.checkKey.bind(this);
  }
  state = {
    index: 0,
    position: new Animated.Value(0),
  };

  componentDidMount() {
    this.myDiv.addEventListener("keydown", this.checkKey);
  }

  componentWillUnmount() {
    this.myDiv.removeEventListener("keydown", this.checkKey);
  }

  handleChangeIndex = (index) => {
    this.setState({ index });
  };

  handleSwitch = (index, type) => {
    if (type === "end") {
      Animated.spring(this.state.position, { toValue: index }).start();
      return;
    }
    this.state.position.setValue(index);
  };

  handleNext = () => {
    if (this.state.index === this.props.len - 1) {
      this.setState({ index: 0 });
      this.state.position.setValue(0);
    } else {
      const idx = this.state.index;
      this.setState({ index: idx + 1 });

      this.state.position.setValue(idx + 1);
    }
  };

  handlePrev = () => {
    if (this.state.index === 0) {
      this.setState({ index: this.props.len - 1 });
      this.state.position.setValue(this.props.len - 1);
    } else {
      const idx = this.state.index;
      this.setState({ index: idx - 1 });
      this.state.position.setValue(idx - 1);
    }
  };

  checkKey(e) {
    e = e || window.event;
    const idx = this.state.index;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      if (idx === this.props.len - 1) {
        this.setState({ index: 0 });
        this.state.position.setValue(0);
      } else {
        this.setState({ index: idx + 1 });
        this.state.position.setValue(idx + 1);
      }
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      if (idx === 0) {
        this.setState({ index: this.props.len - 1 });
        this.state.position.setValue(this.props.len - 1);
      } else {
        this.setState({ index: idx - 1 });
        this.state.position.setValue(idx - 1);
      }
    }
  }

  render() {
    const { index, position } = this.state;
    const albums = this.props.albums;
    const rootNoBack = {
      background: "transparent",
    };
    const rootBack = {
      backgroundImage: `url(${this.props.background})`,
    };

    const rootStyles = this.props.background ? rootBack : rootNoBack;

    return (
      <div
        ref={(ref) => (this.myDiv = ref)}
        tabIndex="0"
        style={{ display: "flex", outline: "none" }}
      >
        <button
          onClick={this.handlePrev}
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: this.props.buttonColor,
            cursor: "pointer",
          }}
        >
          <ArrowBackIosIcon fontSize="large" />
        </button>
        <SwipeableViews
          index={index}
          style={{
            ...rootStyles,
            padding: `0 ${this.props.width ? this.props.width / 8 : 0}px`,
            overflow: "hidden",
          }}
          onChangeIndex={this.handleChangeIndex}
          onSwitching={this.handleSwitch}
          enableMouseEvents
          className="swipe"
        >
          {albums.map((album, currentIndex) => {
            const inputRange = albums.map((_, i) => i);
            const scale = position.interpolate({
              inputRange,
              outputRange: inputRange.map((i) => {
                return currentIndex === i ? 1 : 0.7;
              }),
            });
            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map((i) => {
                return currentIndex === i ? 1 : 0.3;
              }),
            });
            const translateX = position.interpolate({
              inputRange,
              outputRange: inputRange.map((i) => {
                return (100 / 3) * (i - currentIndex);
              }),
            });

            return (
              <Animated.div
                key={String(currentIndex)}
                style={Object.assign(
                  {
                    opacity,
                    transform: [{ scale }, { translateX }],
                    overflow: "hidden",
                  },
                  styles.slide
                )}
              >
                <video
                  width="100%"
                  height="100%"
                  controls
                  onClick={() => {
                    this.setState({ index: currentIndex });
                    this.state.position.setValue(currentIndex);
                  }}
                >
                  <source src={album.src} type="video/mp4" />
                  Sizin brauzer HTML video dəstəkləmir.
                </video>
              </Animated.div>
            );
          })}
        </SwipeableViews>
        <button
          onClick={this.handleNext}
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: this.props.buttonColor,
            cursor: "pointer",
          }}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </button>
      </div>
    );
  }
}

export default CoverflowVideo;
