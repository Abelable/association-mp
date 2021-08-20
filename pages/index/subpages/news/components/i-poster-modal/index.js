Component({
  properties: {
    posterInfo: Object
  },

  attached() {
    this.creatPoster()
  },
  
  methods: {
    async creatPoster() {
      const { bgUrl, avatarUrl, nickName, cover, title, qrCode } = this.properties.posterInfo
      const ctx = wx.createCanvasContext("poster", this)

      ctx.drawImage(bgUrl, 0, 0, 290, 416)

      this.roundRect(ctx, 15, 17, 32, 32, 16, avatarUrl)
      this.setText(ctx, 14, '#fff', 55, 28, nickName)
      this.setText(ctx, 12, '#fff', 55, 46, '发现一个商家好去处')

      ctx.drawImage(cover, 27, 71, 237, 130)

      if (title.length < 16) {
        this.setText(ctx, 14, '#333', 145, 225, title, 'center')
      } else if (title.length > 16 && title.length < 32) {
        this.setText(ctx, 14, '#333', 145, 225, title.slice(0, 16), 'center')
        this.setText(ctx, 14, '#333', 145, 246, title.slice(16), 'center')
      } else {
        this.setText(ctx, 14, '#333', 145, 225, title.slice(0, 16), 'center')
        this.setText(ctx, 14, '#333', 145, 246, `${title.slice(16, 31)}...`, 'center')
      }

      this.roundRect(ctx, 27, 260, 237, 1, 0, '', null, '#f7f7f7')

      this.roundRect(ctx, 100, 270, 90, 90, 0, qrCode)
      this.setText(ctx, 10, '#999', 145, 380, '长按识别小程序码', 'center')

      ctx.draw(true, setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'poster',
          success: res => {
            this.posterUrl = res.tempFilePath
          }
        }, this)
      }, 200))
    },

     /**
     * 绘制圆角矩形
     * @param {Object} ctx - canvas组件的绘图上下文
     * @param {Number} x - 矩形的x坐标
     * @param {Number} y - 矩形的y坐标
     * @param {Number} w - 矩形的宽度
     * @param {Number} h - 矩形的高度
     * @param {Number} r - 矩形的圆角半径
     * @param {Number} cover - 矩形的封面
     * @param {Object} shadow - 矩形的阴影
     * @param {String} [c = 'transparent'] - 矩形的填充色
     */
    roundRect(ctx, x, y, w, h, r = 0, cover = '', shadow = null, c = '#fff') {
      ctx.save()
      ctx.beginPath()

      if (shadow) {
        let { x, y, blur, color } = shadow
        ctx.shadowOffsetX = x
        ctx.shadowOffsetY = y
        ctx.shadowBlur = blur
        ctx.shadowColor = color
      }
      let r1, r2, r3, r4 
      typeof(r) === 'number' ? r1 = r2 = r3 = r4 = r : ([r1, r2, r3, r4] = r)

      ctx.moveTo(x, y);
      r2 ? ctx.arcTo(x + w, y, x + w, y + h, r2) : ctx.lineTo(x + w, y)
      r3 ? ctx.arcTo(x + w, y + h, x , y + h, r3) : ctx.lineTo(x + w, y + h)
      r4 ? ctx.arcTo(x, y + h, x, y, r4) : ctx.lineTo(x, y + h)
      r1 ? ctx.arcTo(x, y, x + w, y , r1) : ctx.lineTo(x, y)
      
      ctx.fillStyle = c
      ctx.fill()
      
      cover && (ctx.clip(), ctx.drawImage(cover, x, y, w, h)) 
      ctx.restore()
    },

    setText(ctx, fs, color, x, y, c, align = 'left') {
      ctx.setFontSize(fs);
      ctx.setFillStyle(color);
      ctx.setTextAlign(align);
      ctx.fillText(c, x, y);
      ctx.restore();
    },

    save() {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.writePhotosAlbum'] !== false) this.saveImageToPhotosAlbum()
          else wx.showModal({
            title: '信息授权提示',
            content: '您当前为未授权状态，请到小程序的设置中打开授权',
            showCancel: true,
            cancelText: '取消',
            confirmText: '去设置',
            success: res => {
              if (res.confirm) wx.openSetting({ success: () => { this.saveImageToPhotosAlbum() }})
            }
          })
        }
      })
    },

    saveImageToPhotosAlbum() {
      wx.saveImageToPhotosAlbum({
        filePath: this.posterUrl,
        success: () => {
          wx.showToast({ title: '成功保存', icon:"success" })
          this.hideModal()
        }
      })
    },

    hideModal() {
      this.triggerEvent('hideModal')
    }
  }
})