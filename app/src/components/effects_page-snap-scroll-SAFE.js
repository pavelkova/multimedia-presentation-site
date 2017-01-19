import React from 'react';

export default class SnapScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true,
      scrollTop: 0
    }
  }

  _masterHandlerUp = () => {
    if (this.state.page + 1 < this.props.pageList.length) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  _masterHandlerDown = () => {
    if (this.state.page + -1 >= 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  masterHandler = (e) => {


    e.preventDefault();

    if (this.state.scrollListen) {

      if (e.deltaY > 20 || e.deltaY < -20) {

        this.setState({ scrollListen: false });

        e.deltaY > 20 ? this._masterHandlerUp() : this._masterHandlerDown()

        // let tlPage = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].childNodes[0].className;
        // console.log(tlPage);

        let nextTop;

        if (e.target.ownerDocument) {
          nextTop = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        }
        else {
           nextTop = e.target.body.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        }
        this.setState({ scrollTop: nextTop });
        window.scrollTo(0, this.state.scrollTop);

        setTimeout(() => { this.setState({ scrollListen: true }) }, 1500);
      }
    }
  }

  keyHandler = (e) => {
    if (e.code === 'ArrowDown') {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (e.code === 'ArrowUp') {
      e.deltaY = -30;
      this.masterHandler(e);
    }
  }
  
  scrollHandler = (e) => {
    e.preventDefault();
    let scrolled = e.target.body.scrollTop;

    window.scrollTo(0, this.state.scrollTop);

    if (
      ((scrolled > this.state.scrollTop) && (scrolled < this.state.scrollTop + 7))
      || scrolled > this.state.scrollTop + 50
    ) {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (
      ((scrolled < this.state.scrollTop) && (scrolled > this.state.scrollTop - 7))
      || scrolled < this.state.scrollTop - 50
    ) {
      e.deltaY = -30;
      this.masterHandler(e);
    }
  }

  touchStartHandler = (e) => {
    this.setState({ startTouch: e.touches[0].clientY });
  }

  endTouchHandler = (e) => {
    this.setState({ endTouch: e.touches[0].clientY });
    if (this.state.startTouch < this.state.endTouch) {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (this.state.startTouch < this.state.endTouch) {
      e.deltaY = -30;
      this.masterHandler(e);
    }
    this.setState({
      startTouch: 0,
      endTouch: 0
    });
  }

  componentDidMount() {
    window.onwheel = this.masterHandler;
    window.onkeydown = this.keyHandler;
    // setTimeout(() => {window.onscroll = this.scrollHandler}, 1500);
    window.ontouchmove = this.touchStartHandler;
    window.ontouchend = this.touchEndHandler;
  }

  render() {

    return (
      <div>
        { this.props.pageList.map((page, i) => {
          return <section className={ i === this.state.page ? 'current-page' : '' } key={ i }>{ page }</section>;
        })}
      </div>
    );
  }
}