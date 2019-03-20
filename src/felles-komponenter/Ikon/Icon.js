/* eslint-disable */
// Generated by gulp svg-icon - do not modify manually


import React, {Component} from 'react';
import PropTypes from 'prop-types';

const iconList = [
  'advarsel-sirkel',
  'advarsel-trekant',
  'advarsel-trekant-fylt',
  'alarm',
  'alarm-ny',
  'arbeidsgiver',
  'feil-sirkel-fylt',
  'help-circle',
  'help-circle_hover',
  'info-sirkel',
  'info-sirkel-fylt',
  'info-sirkel-orange',
  'kalender',
  'minus',
  'nav-ansatt',
  'ok-sirkel',
  'ok-sirkel-fylt',
  'spinner',
  'spinner-negativ',
  'spinner-stroke',
  'spinner-stroke-negativ',
  'spinner-transparent',
  'stegindikator__hake',
  'stonad',
  'tilsette',
  'trashcan',
  'vedlegg',
]


export default class Icon extends Component {

  static propTypes = {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    kind: PropTypes.oneOf([
      'advarsel-sirkel',
      'advarsel-trekant',
      'advarsel-trekant-fylt',
      'alarm',
      'alarm-ny',
      'arbeidsgiver',
      'feil-sirkel-fylt',
      'help-circle',
      'help-circle_hover',
      'info-sirkel',
      'info-sirkel-fylt',
      'info-sirkel-orange',
      'kalender',
      'minus',
      'nav-ansatt',
      'ok-sirkel',
      'ok-sirkel-fylt',
      'spinner',
      'spinner-negativ',
      'spinner-stroke',
      'spinner-stroke-negativ',
      'spinner-transparent',
      'stegindikator__hake',
      'stonad',
      'tilsette',
      'trashcan',
      'vedlegg',
    ]).isRequired,
    onClick: PropTypes.func,
    preview: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    wrapperStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ])
  };

  static defaultProps = {
    size: 32
  }

  render() {
    const {kind, preview} = this.props

    return preview ?
      this.renderPreview() :
      this.renderIcon(kind)
  }

  renderPreview() {
    return (
      <div>
        {iconList.map(kind => this.renderPreviewKind(kind))}
      </div>
    )
  }

  renderIcon(kind) {
    const {wrapperStyle} = this.props;

    if (wrapperStyle)
      return <div style={wrapperStyle}>{this.getIcon(kind)}</div>

    return this.getIcon(kind)
  }

  renderPreviewKind(kind) {
    return (
      <div key={kind}>
        <h3>&lt;Icon kind="{kind}" /&gt;</h3>
        {this.renderIcon(kind)}
      </div>
    )
  }

  getIcon(kind) {
    const {height, onClick, size, style, width, ...props} = this.props;

    switch (kind) {
      default: return null;
      case ('advarsel-sirkel'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 23 24" ><title>Advarsel</title><g stroke="#3E3832" fill="none" fillRule="evenodd" strokeLinejoin="round"><path d="M22.498 11.31c.105 6.075-4.923 11.086-10.998 11.192C5.426 22.608.607 17.768.502 11.692.396 5.62 5.426.609 11.5.503 17.574.396 22.393 5.237 22.498 11.31zM11.5 13V6" strokeLinecap="round"/><path d="M12 16.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/></g></svg>);
      case ('advarsel-trekant'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 23 23" ><title>Advarsel</title><g stroke="#BA3A26" fill="none" fillRule="evenodd" strokeLinejoin="round"><path d="M11.5 15.805V8.154m11 14.346H.5l11-22z" strokeLinecap="round"/><path d="M12 19a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/></g></svg>);
      case ('advarsel-trekant-fylt'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24" ><title>Advarsel</title><path d="M23.892 23.16L12.462.266c-.178-.355-.758-.355-.934 0L.055 23.244A.523.523 0 0 0 .523 24h22.955a.523.523 0 0 0 .414-.84zM11.474 8.492a.522.522 0 1 1 1.043 0v7.993a.523.523 0 0 1-1.043 0V8.492zm.521 12.487a.998.998 0 1 1 0-1.996.998.998 0 0 1 0 1.996z" fill="#FFF" fillRule="evenodd"/></svg>);
      case ('alarm'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 23 24" ><title>Alarm</title><path d="M19.167 15.437v-4.963c0-3.293-2.19-6.096-5.257-7.18C13.7 1.994 12.525 1 11.102 1c-1.423 0-2.601.995-2.811 2.293-3.067 1.085-5.255 3.888-5.255 7.181v4.963c0 1.495-1.275 2.707-2.846 2.707h21.824c-1.574 0-2.847-1.212-2.847-2.707zM13.98 20.14c0 1.496-1.276 2.708-2.848 2.708-1.574 0-2.846-1.212-2.846-2.707" stroke="#3E3832" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"/></svg>);
      case ('alarm-ny'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 26" ><title>Alarm, nye</title><g fill="none" fillRule="evenodd"><path d="M19.167 17.437v-4.963c0-3.293-2.19-6.096-5.257-7.18C13.7 3.994 12.525 3 11.102 3c-1.423 0-2.601.995-2.811 2.293-3.067 1.085-5.255 3.888-5.255 7.181v4.963c0 1.495-1.275 2.707-2.846 2.707h21.824c-1.574 0-2.847-1.212-2.847-2.707zM13.98 22.14c0 1.496-1.276 2.708-2.848 2.708-1.574 0-2.846-1.212-2.846-2.707" strokeLinecap="round" stroke="#3E3832" strokeLinejoin="round"/><path d="M16.345 14.335c-3.64 0-6.591-2.887-6.591-6.449 0-3.561 2.95-6.449 6.591-6.449s6.592 2.888 6.592 6.45c0 3.561-2.951 6.448-6.592 6.448" fill="#C30000" fillRule="nonzero"/><path d="M16.345 14.335c-3.64 0-6.591-2.887-6.591-6.449 0-3.561 2.95-6.449 6.591-6.449s6.592 2.888 6.592 6.45c0 3.561-2.951 6.448-6.592 6.448z" stroke="#FFF" strokeWidth="1.016"/><path d="M17.928 7.98c0 .804-.665 1.455-1.486 1.455s-1.486-.65-1.486-1.454c0-.804.665-1.454 1.486-1.454s1.486.65 1.486 1.454" fill="#FFF" fillRule="nonzero"/></g></svg>);
      case ('arbeidsgiver'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 26 26" ><title>Arbeidsgiver</title><g stroke="#3E3832" strokeWidth="1.046" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"><path d="M12 24H0V9.6h12zM10 3.84H3V9.6h7zM6 2.88V0M24 24h-9V5.76h9zM17 7.68h5M17 9.6h5M17 11.52h5M17 13.44h5M17 15.36h5M17 17.28h5M17 19.2h5M3 12.48h7M3 15.36h7M3 18.24h7M5 5.76h3M5 7.68h3"/><path d="M7 21.12H5v1.92h2zM21 21.12h-2v1.92h2z"/></g></svg>);
      case ('feil-sirkel-fylt'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24"><title>Stopp</title><path fill="#BA3A26" d="M0 12c0 3.2 1.2 6.2 3.4 8.5S8.6 24 11.7 24c6.5 0 11.8-5.4 11.8-12S18.2 0 11.7 0C5.3 0 0 5.4 0 12zm11.8 11.5zm6.6-9.9H5.1v-3.1h13.3v3.1z"/></svg>);
      case ('help-circle'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 18.22 18.22"><title>Hjelp</title><path fill="none" d="M9.11 1a8.11 8.11 0 1 0 8.11 8.11A8.12 8.12 0 0 0 9.11 1zm0 13.7a.89.89 0 1 1 .89-.9.89.89 0 0 1-.89.9zm.5-5.7v1.89a.5.5 0 0 1-1 0V8.5a.5.5 0 0 1 .5-.5 1.85 1.85 0 1 0-1.85-1.85.5.5 0 0 1-1 0A2.85 2.85 0 1 1 9.61 9z"/><path fill="#2968b2" d="M9.11 0a9.11 9.11 0 1 0 9.11 9.11A9.12 9.12 0 0 0 9.11 0zm0 17.22a8.11 8.11 0 1 1 8.11-8.11 8.12 8.12 0 0 1-8.11 8.11z"/><path fill="#2968b2" d="M9.11 3.3a2.85 2.85 0 0 0-2.85 2.85.5.5 0 0 0 1 0A1.85 1.85 0 1 1 9.11 8a.5.5 0 0 0-.5.5v2.35a.5.5 0 0 0 1 0V9a2.85 2.85 0 0 0-.5-5.65z"/><circle fill="#2968b2" cx="9.11" cy="13.8" r=".89"/></svg>);
      case ('help-circle_hover'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 18.22 18.22"><title>Hjelp</title><path fill="#2868B3" d="M9.1 0C4.1 0 0 4.1 0 9.1s4.1 9.1 9.1 9.1 9.1-4.1 9.1-9.1S14.1 0 9.1 0zm0 14.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zM9.6 9v1.9c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.5c0-.3.2-.5.5-.5 1 0 1.9-.8 1.9-1.8s-.8-1.9-1.9-1.9-1.8.8-1.8 1.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-1.6 1.3-2.9 2.8-2.9 1.4 0 2.5 1 2.8 2.4.3 1.6-.7 3.1-2.3 3.4z"/></svg>);
      case ('info-sirkel'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 23 23" ><title>Informasjon</title><g stroke="#3E3832" fill="none" fillRule="evenodd" strokeLinejoin="round"><path d="M22.5 11.5c0 6.075-4.926 11-11 11-6.076 0-11-4.925-11-11s4.924-11 11-11c6.074 0 11 4.925 11 11zm-14 7h6" strokeLinecap="round"/><path strokeLinecap="round" d="M9.5 9.5h2V18"/><path d="M11 5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z"/></g></svg>);
      case ('info-sirkel-fylt'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24" ><title>Informasjon</title><path d="M12 0C5.382 0 0 5.382 0 12s5.382 12 12 12c6.617 0 12-5.382 12-12S18.617 0 12 0zm-.522 5.217a1.045 1.045 0 1 1-.002 2.09 1.045 1.045 0 0 1 .002-2.09zm3.652 14.61H8.87a.522.522 0 0 1 0-1.044h2.608v-8.348H9.913a.522.522 0 0 1 0-1.044H12c.287 0 .522.234.522.522v8.87h2.608a.523.523 0 0 1 0 1.043z" fill="#3E3832" fillRule="evenodd"/></svg>);
      case ('info-sirkel-orange'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24" ><title>Informasjon</title><g fill="#D87F0A" fillRule="evenodd"><path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 22.957C5.958 22.957 1.043 18.042 1.043 12 1.043 5.958 5.958 1.043 12 1.043c6.042 0 10.957 4.915 10.957 10.957 0 6.042-4.915 10.957-10.957 10.957z"/><path d="M15.13 18.783h-2.608v-8.87A.522.522 0 0 0 12 9.391H9.913a.522.522 0 0 0 0 1.044h1.565v8.348H8.87a.522.522 0 0 0 0 1.043h6.26a.522.522 0 0 0 0-1.043z"/><ellipse cx="11.478" cy="5.739" rx="1.043" ry="1.043"/></g></svg>);
      case ('kalender'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 18 18" ><title>Kalender</title><g stroke="#0067C5" fill="none" fillRule="evenodd"><path d="M4 2.667H1.333v14h15.334v-14H14"/><path d="M4 1.333h2V4H4zM12 1.333h2V4h-2zM6 2h6M1.333 6h15.334"/></g></svg>);
      case ('minus'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24" ><title>Minus</title><g fill="none" fillRule="evenodd"><path stroke="#0067C5" d="M20.147 3.884A11.43 11.43 0 0 0 11.999.5C5.671.5.512 5.649.5 11.977a11.422 11.422 0 0 0 3.352 8.139 11.423 11.423 0 0 0 8.126 3.384c6.347 0 11.51-5.147 11.522-11.48a11.419 11.419 0 0 0-3.353-8.136z"/><path d="M18.262 12.522H5.739a.522.522 0 0 1 0-1.044h12.523a.522.522 0 0 1 0 1.044z" fill="#0067C5"/></g></svg>);
      case ('nav-ansatt'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 85 83"><title>Navansatt</title><g fill="none" fillRule="evenodd"><path fill="#F1D8D4" d="M82.583 41.703c0 21.783-17.943 39.441-40.075 39.441-22.133 0-40.076-17.658-40.076-39.441S20.375 2.26 42.508 2.26c22.132 0 40.075 17.659 40.075 39.442z"/><path stroke="#F1D8D4" strokeWidth="3.134" d="M42.508 81.144c-22.133 0-40.076-17.658-40.076-39.441S20.375 2.26 42.508 2.26c22.132 0 40.075 17.659 40.075 39.442S64.64 81.144 42.508 81.144z"/><path fill="#E57D61" d="M63.626 35.953h-.041c0-12.62-9.245-22.85-20.648-22.85-11.404 0-20.649 10.23-20.649 22.85v.01c-.003 10.778-5.647 16.94-5.647 16.94s5.573 6.732 26.296 6.732h.04c20.723 0 26.296-6.732 26.296-6.732s-5.647-6.166-5.647-16.95"/><path fill="#5F224E" d="M64.404 67.838v8.357c0 .373-9.19 6.55-21.29 6.55-11.27 0-17.533-3.55-21.465-5.908-.584-2.39-1.038-6.138-1.038-8.999 0-9.76 12.7-17.916 23.85-17.916 11.152 0 19.943 8.156 19.943 17.916z"/><path fill="#F2EFEE" d="M61.153 33.29a1.353 1.353 0 0 0-1.828-1.02l-.057.006c-5.045-6.761-14.883-.524-22.392-6.98-.962-1.01-1.463-1.713-1.595-1.713 0 0-7.282 6.214-8.495 8.594 0 0-.085.17-.196.093a1.353 1.353 0 0 0-1.829 1.02 1.3 1.3 0 0 0-.047.332v5.417c0 .74.61 1.341 1.363 1.341.302 0 .578-.1.804-.263 1.112 5.005 3.948 9.208 7.731 11.747-.972.36-2.663 1.187-2.663 1.187.856 1.236 3.803 7.729 11.004 7.729 7.202 0 11.016-6.63 11.732-8.33 0 0-1.061-.717-2.619-1.13 3.4-2.574 5.931-6.54 6.967-11.203.226.164.503.263.804.263.753 0 1.364-.6 1.364-1.341v-5.417a1.3 1.3 0 0 0-.048-.332"/><path fill="#5F224E" d="M53.36 68.866h-1.185a.293.293 0 0 1-.295-.29v-.02c0-.16.132-.29.295-.29h1.185c.163 0 .295.13.295.29v.02c0 .16-.132.29-.295.29"/><path fill="#F2EFEE" d="M41.516 64.912h3.586l6.496-8.008H34.632z"/><path fill="#CD1719" d="M60.695 74.95H47.643a.627.627 0 0 1-.632-.621v-7.237c0-.343.283-.622.632-.622h13.052c.349 0 .632.279.632.622v7.237a.627.627 0 0 1-.632.622"/><path fill="#FFF" d="M57.415 70.856c0 1.706-1.405 3.092-3.14 3.092-1.736 0-3.143-1.386-3.143-3.092 0-1.707 1.407-3.092 3.144-3.092 1.734 0 3.139 1.385 3.139 3.092m-7.209 1.362h-.613l.655-1.58h.614zm7.722 0h-.38l.655-1.58h.38zm1.048 0h-.16l.652-1.58h.161z"/><path fill="#C42229" d="M51.89 72.21h.481c.026 0 .045-.018.045-.042V70.69a.043.043 0 0 0-.045-.043h-.486a.055.055 0 0 0-.057.056l-.192.465a.038.038 0 0 0 .034.053h.138c.02 0 .038.015.038.038v.91c0 .023.019.042.043.042"/><path fill="#C42229" d="M52.937 72.21h.484c.025 0 .046-.018.046-.042V70.69c0-.024-.02-.043-.046-.043h-.752a.057.057 0 0 0-.057.056l-.192.465-.066.053h.384c.086 0 .156.067.156.153v.794c0 .024.019.043.043.043m2.163-1.564h-.484a.043.043 0 0 0-.044.043v1.478c0 .024.02.043.044.043h.489a.055.055 0 0 0 .056-.056l.192-.466c.012-.024-.007-.052-.036-.052h-.134a.037.037 0 0 1-.037-.037v-.91c0-.024-.023-.043-.046-.043"/><path fill="#C42229" d="M53.11 72.21h.318c.03 0 .057-.025.057-.055l.19-.466c.012-.024-.006-.052-.035-.052h-.133l-.397.574zm3.284-1.563h.575c.029 0 .048.026.037.052l-.61 1.488c-.004.015-.018.024-.036.024h-.52l.517-1.539a.039.039 0 0 1 .037-.025"/><path fill="#C42229" d="M55.673 70.647h-.813c-.057 0 .234.055.254.107l.575 1.408a.077.077 0 0 0 .074.049h.493l-.508-1.511a.077.077 0 0 0-.075-.053m-1.561 0c.27 0 .499.182.499.502 0 .315-.04.333-.04.333s-.046-.301-.283-.301c-.232 0-.285.133-.285.232 0 .116.119.224.185.224h.423l-.25.545a.052.052 0 0 1-.046.029h-.192c-.202 0-.728-.26-.728-.763 0-.504.39-.8.717-.8"/><path fill="#5B2052" d="M55.044 67.354H53.58a.112.112 0 0 1-.113-.112v-.35c0-.061.05-.11.113-.11h1.464c.063 0 .114.049.114.11v.35c0 .062-.05.112-.114.112"/><path fill="#86497E" d="M53.926 67.123h.773v-2.276h-.773z"/><path fill="#D19E9C" d="M47.514 47.914a.412.412 0 0 1-.36-.212c-.03-.047-.599-.957-1.945-.862l-1.679.119a.414.414 0 0 1-.058-.826l1.677-.12c1.935-.131 2.696 1.228 2.727 1.286a.415.415 0 0 1-.362.615"/><path fill="#59514B" d="M37.295 37.412c-1.184.076-1.516-1.415-1.159-2.388.067-.185.459-1.024 1.153-1.024.693 0 .999.459 1.041.538.51.949.26 2.79-1.035 2.874m13.213 0c1.184.076 1.516-1.415 1.159-2.388C51.6 34.84 51.207 34 50.514 34c-.693 0-.999.459-1.042.538-.51.949-.26 2.79 1.036 2.874"/><path fill="#D0BEA3" d="M43.643 43.193a1.85 1.85 0 0 1-.74-.138.208.208 0 0 1-.106-.274.209.209 0 0 1 .274-.105c.487.216 1.36.078 1.989-.314.64-.398 1.023-.874 1.107-1.377.068-.41-.067-.836-.392-1.234-.225-.277-.754-.36-1.53-.24a.21.21 0 0 1-.235-.174.207.207 0 0 1 .173-.236c.942-.146 1.585-.015 1.913.389.401.493.567 1.033.48 1.563-.105.623-.553 1.198-1.297 1.661-.5.311-1.105.479-1.636.479"/></g></svg>);
      case ('ok-sirkel'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24" ><title>Suksess</title><g fill="#06893A" fillRule="evenodd"><path d="M10 16a.502.502 0 0 1-.354-.147l-2.5-2.5a.5.5 0 0 1 .707-.707l2.16 2.158 7.145-6.67a.502.502 0 0 1 .707.024.502.502 0 0 1-.024.707l-7.5 7a.5.5 0 0 1-.34.134z"/><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-23C5.935 1 1 5.935 1 12s4.935 11 11 11 11-4.935 11-11S18.065 1 12 1z"/></g></svg>);
      case ('ok-sirkel-fylt'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 25 24" ><title>Suksess</title><path d="M12.77 0C6.208 0 .87 5.384.87 12s5.338 12 11.9 12 11.902-5.384 11.902-12S19.332 0 12.77 0zm5.298 8.866l-7.439 7a.495.495 0 0 1-.69-.012l-2.479-2.5a.503.503 0 0 1 0-.707.493.493 0 0 1 .702 0l2.14 2.158 7.088-6.67a.494.494 0 0 1 .702.023.504.504 0 0 1-.024.708z" fill="#3E3832" fillRule="evenodd"/></svg>);
      case ('spinner'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 50 50" preserveAspectRatio="xMidYMid"><title>Venter...</title><circle xmlns="http://www.w3.org/2000/svg" cx="25" cy="25" r="20" stroke="#bdbab7" fill="none" strokeWidth="5"/><circle cx="25" cy="25" r="20" stroke="#7f756c" fill="none" strokeWidth="5" strokeDasharray="50 155" strokeLinecap="round"/></svg>);
      case ('spinner-negativ'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 50 50" preserveAspectRatio="xMidYMid"><title>Venter...</title><circle xmlns="http://www.w3.org/2000/svg" cx="25" cy="25" r="20" stroke="#eee" fill="none" strokeWidth="5"/><circle cx="25" cy="25" r="20" stroke="#888" fill="none" strokeWidth="5" strokeDasharray="50 155" strokeLinecap="round"/></svg>);
      case ('spinner-stroke'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 50 50" preserveAspectRatio="xMidYMid"><title>Venter...</title><circle xmlns="http://www.w3.org/2000/svg" cx="25" cy="25" r="20" stroke="#bdbab7" fill="none" strokeWidth="5"/><circle cx="25" cy="25" r="20" stroke="#7f756c" fill="none" strokeWidth="3" strokeDasharray="50 155" strokeLinecap="round"/></svg>);
      case ('spinner-stroke-negativ'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 50 50" preserveAspectRatio="xMidYMid"><title>Venter...</title><circle xmlns="http://www.w3.org/2000/svg" cx="25" cy="25" r="20" stroke="#eee" fill="none" strokeWidth="5"/><circle cx="25" cy="25" r="20" stroke="#888" fill="none" strokeWidth="3" strokeDasharray="50 155" strokeLinecap="round"/></svg>);
      case ('spinner-transparent'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 50 50" preserveAspectRatio="xMidYMid"><title>Venter...</title><circle xmlns="http://www.w3.org/2000/svg" cx="25" cy="25" r="20" stroke="transparent" fill="none" strokeWidth="5"/><circle cx="25" cy="25" r="20" stroke="#7f756c" fill="none" strokeWidth="5" strokeDasharray="50 155" strokeLinecap="round"/></svg>);
      case ('stegindikator__hake'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 32 32" ><title>Avhuket</title><g fill="none" fillRule="evenodd"><path d="M16 0C7.177 0 0 7.179 0 16s7.177 16 16 16c8.821 0 16-7.179 16-16S24.821 0 16 0zm7.121 11.821l-10 9.334a.669.669 0 0 1-.926-.016L8.86 17.805a.667.667 0 0 1 .943-.942l2.877 2.877 9.53-8.893a.668.668 0 1 1 .91.974z" fill="#97D2AE"/><path d="M23.121 11.821l-10 9.334a.669.669 0 0 1-.926-.016L8.86 17.805a.667.667 0 0 1 .943-.942l2.877 2.877 9.53-8.893a.668.668 0 1 1 .91.974z" fill="#3E3832"/></g></svg>);
      case ('stonad'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 25 24" ><title>Stønad</title><g stroke="#3E3832" fill="none" fillRule="evenodd" strokeLinejoin="round"><path d="M4.701 22.44H.534v-8.378h4.167z"/><path d="M4.7 20.833c10.938 3.646 7.292 3.646 19.792-2.604-1.107-1.106-1.98-1.368-3.125-1.041L16.75 18.72" strokeLinecap="round"/><path d="M4.7 15.104h3.126c2.45 0 4.166 1.563 4.687 2.084h3.125c1.66 0 1.66 2.083 0 2.083H9.91M15.117 3.646a3.125 3.125 0 1 0 6.25 0 3.125 3.125 0 0 0-6.25 0zM9.91 10.938a3.125 3.125 0 1 0 6.249 0 3.125 3.125 0 0 0-6.25 0zM13.034 9.896v2.083M18.242 2.604v2.083" strokeLinecap="round"/></g></svg>);
      case ('tilsette'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24" ><title>Tilsette</title><g fill="none" fillRule="evenodd"><path stroke="#0067C5" d="M20.147 3.884A11.43 11.43 0 0 0 11.999.5C5.671.5.512 5.649.5 11.977a11.422 11.422 0 0 0 3.352 8.139 11.423 11.423 0 0 0 8.126 3.384c6.347 0 11.51-5.147 11.522-11.48a11.419 11.419 0 0 0-3.353-8.136z"/><path d="M18.262 12.522H5.739a.522.522 0 0 1 0-1.044h12.523a.522.522 0 0 1 0 1.044z" fill="#0067C5"/><path d="M11.479 18.261V5.74a.522.522 0 0 1 1.043 0V18.26a.522.522 0 0 1-1.043 0z" fill="#0067C5"/></g></svg>);
      case ('trashcan'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 24 24"><title>Søppelkasse</title><path d="M3.516 3.5h16v20h-16zm4-3h8v3h-8zm-6.5 3h22M7.516 7v12m4-12v12m4-12v12" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/></svg>);
      case ('vedlegg'): return (<svg {...props} focusable="false" height={height || size} width={width || size} onClick={onClick} style={style} viewBox="0 0 21 20" ><title>Vedlegg</title><path d="M3.398 19.372c-.43 0-.843-.088-1.24-.264a3.57 3.57 0 0 1-1.084-.752C.358 17.64 0 16.771 0 15.75c0-1.022.358-1.891 1.074-2.607l11.23-11.915c.43-.442.915-.764 1.456-.966a4.034 4.034 0 0 1 1.66-.254c.566.032 1.13.182 1.69.449a5.93 5.93 0 0 1 1.581 1.123c.43.443.765.967 1.006 1.572.241.606.355 1.24.342 1.905a5.185 5.185 0 0 1-.39 1.894 4.908 4.908 0 0 1-1.016 1.563l-8.496 9.023a.614.614 0 0 1-.879.04.631.631 0 0 1-.186-.44.627.627 0 0 1 .166-.46l8.496-9.023a3.66 3.66 0 0 0 .762-1.191c.182-.456.28-.931.293-1.426 0-.495-.085-.967-.254-1.416-.17-.45-.417-.83-.742-1.143a4.283 4.283 0 0 0-2.207-1.2c-.872-.19-1.667.08-2.383.81L1.973 14a2.37 2.37 0 0 0-.723 1.738c0 .677.24 1.257.723 1.738.221.222.462.388.722.499.26.11.534.153.82.126.274-.013.55-.087.83-.224.28-.137.538-.329.772-.576l8.926-9.492c.17-.17.348-.427.537-.772.189-.345.114-.68-.225-1.006-.182-.195-.338-.303-.468-.322-.13-.02-.215-.03-.254-.03a1.005 1.005 0 0 0-.39.147 2.738 2.738 0 0 0-.45.342l-6.719 7.148a.556.556 0 0 1-.43.196.652.652 0 0 1-.449-.176.556.556 0 0 1-.195-.43c0-.17.059-.319.176-.449l6.719-7.168c.273-.26.543-.462.81-.605.267-.144.537-.228.81-.254.222-.013.482.02.782.097.3.078.612.28.937.606.495.482.713 1.048.655 1.699-.059.651-.375 1.263-.948 1.836L6.016 18.18a4.242 4.242 0 0 1-1.153.83 3.39 3.39 0 0 1-1.289.341.453.453 0 0 0-.088.01.453.453 0 0 1-.088.01z" fill="#0067C5" fillRule="evenodd"/></svg>);
    }
  }
}

