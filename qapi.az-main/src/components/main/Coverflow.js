import React from "react";
import SwipeableViews from "react-swipeable-views";
import Animated from "animated/lib/targets/react-dom";
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Fullscreen as FullscreenIcon,
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

class DemoCoverflow extends React.Component {
  constructor(props) {
    super(props);
    this.checkKey = this.checkKey.bind(this);
  }
  state = {
    position: new Animated.Value(this.props.index),
  };

  componentDidMount() {
    this.myDiv.addEventListener("keydown", this.checkKey);
    this.myDiv.focus();
  }

  componentWillUnmount() {
    this.myDiv.removeEventListener("keydown", this.checkKey);
  }

  handleChangeIndex = (index) => {
    this.props.setIndex(index);
  };

  handleSwitch = (index, type) => {
    if (type === "end") {
      Animated.spring(this.state.position, { toValue: index }).start();
      return;
    }
    this.state.position.setValue(index);
  };

  handleNext = () => {
    if (this.props.index === this.props.len - 1) {
      this.props.setIndex(0);
      this.state.position.setValue(0);
    } else {
      const idx = this.props.index;
      this.props.setIndex(idx + 1);

      this.state.position.setValue(idx + 1);
    }
  };

  handlePrev = () => {
    if (this.props.index === 0) {
      this.props.setIndex(this.props.len - 1);
      this.state.position.setValue(this.props.len - 1);
    } else {
      const idx = this.props.index;
      this.props.setIndex(idx - 1);
      this.state.position.setValue(idx - 1);
    }
  };

  checkKey(e) {
    e = e || window.event;
    const idx = this.props.index;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      if (idx === this.props.len - 1) {
        this.props.setIndex(0);
        this.state.position.setValue(0);
      } else {
        this.props.setIndex(idx + 1);
        this.state.position.setValue(idx + 1);
      }
    } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      if (idx === 0) {
        this.props.setIndex(this.props.len - 1);
        this.state.position.setValue(this.props.len - 1);
      } else {
        this.props.setIndex(idx - 1);
        this.state.position.setValue(idx - 1);
      }
    } else if (e.key === "Escape") {
      this.props.setSelectedImage(null);
    }
  }

  render() {
    const { position } = this.state;
    const index = this.props.index;
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
            padding: `0 ${this.props.width ? this.props.width / 4 : 0}px`,
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
                <img
                  style={{
                    ...styles.img,
                    width: this.props.isFullScreen ? "100vw" : "50%",
                    height: this.props.isFullScreen ? "100vh" : "50%",
                  }}
                  src={album.src}
                  alt="cover"
                  onClick={() => {
                    this.props.setIndex(currentIndex);
                    this.state.position.setValue(currentIndex);
                  }}
                  className={`${!this.props.allowHoverScale && "noHover"}`}
                  loading="lazy"
                />
                {this.props.allowFullScreen && (
                  <FullscreenIcon
                    style={{
                      position: "absolute",
                      bottom: "5%",
                      right: "5%",
                      width: "50px",
                      height: "50px",
                      color: "black",
                      alignSelf: "flex-end",
                      cursor: "pointer",
                    }}
                    onClick={() => this.props.setSelectedImage(currentIndex)}
                  />
                )}
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

export default DemoCoverflow;
