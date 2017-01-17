import React from 'react';
import {render} from 'react-dom';

import {ImgContent} from './assets/content_image-page';
import ImagePage from './pages/page_image-header';

import {TlContent} from './assets/content_timeline-page';
import TimelinePage from './pages/page_timeline';

import {HdContent} from './assets/content_header-page';
import HeaderPage from './pages/page_frame-header';

import {VidContent} from './assets/content_video-page';
import VideoPage from './pages/page_video';

class BandBio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true
    }
  }

  _onScrollUp = (e) => {
    if (this.state.page + 1 < this.state.pageList.length) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  _onScrollDown = (e) => {
    if (this.state.page + -1 >= 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  _onScroll = (e) => {

    e.preventDefault();

    console.log(e);
    this.setState({ pageList: e.target.offsetParent.childNodes[1].childNodes[0].childNodes });
    console.log(this.state.pageList);

    if (this.state.scrollListen) {

      if (e.deltaY > 20 || e.deltaY < -20) {
        this.setState({ scrollListen: false });

        e.deltaY > 20 ? this._onScrollUp(e) : this._onScrollDown(e)

        let nextTop = e.target.offsetParent.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        window.scrollTo(0, nextTop);

        setTimeout(() => { this.setState({ scrollListen: true }) }, 1500);
      }
    }
    else {
      return;
    }
  }

  componentDidMount() {
    window.addEventListener('wheel', this._onScroll);
  }

  render() {

    return (
    <div>
      <ImagePage page={ImgContent.page1} />
      <TimelinePage page={TlContent.page2} />
      <HeaderPage page={HdContent.page3} />
      <VideoPage page={VidContent.page4} />
      <ImagePage page={ImgContent.page5} />
      <VideoPage page={VidContent.page6} />
    </div>
    );
  }
}

render(<BandBio />, document.getElementById('app'));
