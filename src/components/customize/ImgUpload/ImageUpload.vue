<template>
  <div class="g-image-upload" :class="{'single': singleMode}">
    <!-- 展示图片区 -->
    <transition-group name="list">
      <image-box v-for="(img, index) in imgs" :key="img.uid"  
        :imgUrl="img.imgUrl" :status="img.status"
        :progress="img.progress" :single="singleMode"
        :disable="disable"
        @replace="replaceImg(index)" @show="showImg(index)"
        @del="del(index)"></image-box>
    </transition-group>

    <!-- 添加图片按钮区 -->
    <template v-if="!disable">
      <transition name="fade">
        <div class="input-area" :class="{'single': singleMode}" v-show="inputAreaState">
          <div class="box add-box" :class="{'single': singleMode}" @click="addImg">
            <i class="material-icons" style="font-size: 36px;">add</i>
            <p>Upload</p>
          </div>
          <input
            ref="file-upload" type="file"
            style="width: 100%;height: 100%;display:none"
            multiple="multiple">
        </div>
      </transition>
    </template>
    
    <!-- 无图片显示区 -->
    <div class="input-area" :class="{'single': singleMode}" v-if="disable && imgs.length == 0">
      <div class="box empty-box" :class="{'single': singleMode}">
         <i class="material-icons" style="font-size: 36px;">info</i> 
        <p>暂无图片</p>
      </div>
    </div>
  </div>
</template>

<script>
import props from './props';
import ImageBox from './ImageBox.vue';
import xhr from './lib/xhr';

require('./style/style.scss');

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};

export default {
  data() {
    return {
      // 保存当前图片信息
      imgs: [
        // {
        //   status: '',
        //   imgUrl: '',
        //   progress: 0,
        //   uid: generateUUID(),
        // }
      ],
    }
  },
  props: props,
  methods: {

    /**
     * @function createImgObj
     * 根据是否有 url 包装对象
     * 若存在 url 则将状态设置为已加载完成并返回
     * 若不存在 设置为未加载完成状态并返回
     * @param  {String} url {图片 url}
     * @return {Object} {根据是否有 url 包装对象}
     */
    createImgObj(url) {
      let obj = {
        status: '',
        imgUrl: '',
        progress: 0,
        uid: generateUUID(),
      };
      if (url) {
        obj.imgUrl = url;
        obj.status = 'uploaded';
        obj.progress = 100;
      };
      return obj;
    },

    /**
     * @function addImg {向当前图片对象池尾添加图片}
     */
    addImg() {
      const self = this;
      let uploadBtn = this.$refs['file-upload'];
      uploadBtn.onchange = function (e) {
        let files = e.target.files;
        let promisesArr = [];

        // 检查文件个数是否超出
        if (self.max > 0 && files.length + self.imgs.length > self.max) {
          self.$emit('err', '文件数量过多');
          return;
        }

        // 每个文件分开上传
        for (let i = 0; i < files.length; i++) {
          let obj = self.createImgObj();
          self.imgs.push(obj);
          let promise = self.upload(obj, files[i]);
          promisesArr.push(promise);
        }

        // 所有文件完成上传动作
        Promise.all(promisesArr).then(resp => {
          self.submitDone();
        })
      }
      uploadBtn.click();
    },

    /**
     * @function replaceImg {替换当前图片对象池中指定 index 的图片对象}
     */
    replaceImg(index) {
      const self = this;
      let obj = this.createImgObj();
      let uploadBtn = this.$refs['file-upload'];
      uploadBtn.onchange = function (e) {
        self.imgs.splice(index, 1, obj);
        self.upload(obj, e.target.files[0]).then(resp => {
          self.submitDone();
        })
      }
      uploadBtn.click();
    },

    /**
     * @function createPreviewBox {添加预览图片遮盖层}
     * @param  {String} url {要显示的图片URL}
     * @return {HTMLDivElement} {带有图片的遮盖层el}
     */
    createPreviewBox(url) {

      /**
       * @function addStyle {为el添加style}
       * @param  {HTMLDivElement} el    {待添加的el}
       * @param  {Object} props {键值对形式的样式描述}
       */
      const addStyle = function(el, props) {
        for (let prop in props) {
          el.style[prop] = props[prop];
        }
      }

      const TRANSITION_TIME = 300; // 动画持续时长

      let previewBox = document.createElement('div');
      addStyle(previewBox, {
        position: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.6)',
        left: 0, right: 0, top: 0, bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        transition: 'opacity ' + TRANSITION_TIME / 1000 + 's',
      })

      let img = document.createElement('img');
      img.src = url;
      previewBox.appendChild(img);

      previewBox.onclick = function (e) {
        this.style.opacity = 0;
        // 在消失动画结束后移除el
        setTimeout(() => {
          document.body.removeChild(this);
        }, TRANSITION_TIME);
      }

      return previewBox;
    },
    
    /**
     * @function showImg {页面内预览图片}
     * @param {Number} index {要显示的图片的索引}
     */
    showImg(index) {
      // 创建图片预览遮盖层
      let previewBox = this.createPreviewBox(this.imgs[index].imgUrl);
      document.body.appendChild(previewBox);
      // 在下一个任务队列修改 opacity
      setTimeout(() => {
        previewBox.style.opacity = 1;
      }, 0);
    },

    /**
     * @function submitDone {在上传结束后发起 done 事件并返回对象池中的全部 url 信息}
     */
    submitDone() {
      // 清空上传input中的数据
      this.clearInput();
      
      // 遍历对象池 整理 url
      let urlsList = [];

      if (this.singleMode) {
        // 单图模式返回字符串形式的 url
        urlsList = this.imgs[0].imgUrl;
      } else {
        // 多图模式返回数组形式
        this.imgs.forEach(img => {
          if (img.imgUrl) {
            urlsList.push(img.imgUrl);
          }
        });
      }

      this.$emit('done', urlsList);
    },

    /**
     * @function clearInput {清空上传input中的数据}
     */
    clearInput() {
      this.$refs['file-upload'].value = '';
    },

    /**
     * @function del {删除指定index的图片对象池中的对象}
     * @param  {Number} index {指定删除对象的index值}
     */
    del(index) {
      this.imgs.splice(index, 1);
    },

    /**
     * @function upload {上传单个图片文件}
     * @param  {Object} obj  {状态改变将要影响的对象}
     * @param  {File} file {要上传的文件}
     * @return {Promise} {在上传成功和错误时都会触发resolve}
     */
    upload(obj, file) {

      return new Promise((resolve, reject) => {
        const self = this;

        // 检查文件大小
        if (this.limit > 0 && file.size > this.limit) {
          obj.status = 'err';
          resolve('ERROR: Over size limit');
          return;
        }
        
        /**
         * @function done 上传成功的回调
         * @param  {Object} resp {上传成功返回数据}
         */
        const done = function (resp) {

          obj.status = 'uploaded';
          obj.imgUrl = resp.data;

          resolve(obj.imgUrl);
        }

        /**
         * @function err 上传失败的回调
         * @param  {Object} err {错误提示对象}
         */
        const err = function (err) {
          obj.status = 'err';
          resolve('ERROR: Upload failed');
        }

        /**
         * @function uploading 上传过程中触发的回调
         * @param  {Number} progress {上传进度}
         */
        const uploading = function (progress) {
          // 修改对应对象的进度显示
          obj.progress = progress;
          self.$emit('uploading', progress);
        }

        // 将文件放入表单中
        let data = new FormData();
        let aFile = file;
        data.append('file', aFile, aFile.name);
        // 修改对象状态
        obj.status = 'uploading';
        // 使用 axios 上传
        xhr(this.api, this.headers, data, done, uploading, err);
      })
    },
  },
  components: {
    'image-box': ImageBox,
  },

  /**
   * 初始化展示原有图片
   */
  mounted() {

    if (this.singleMode) {
      let obj = null;
      if (this.value !== '' && this.value !== null) {
        // 创建已完成状态的对象
        obj = this.createImgObj(this.value);
        // 放入对象池
        this.imgs.push(obj);
      }
    } else {
      this.value.forEach(url => {
        if (url !== '' && url !== null) {
          // 创建已完成状态的对象
          let obj = this.createImgObj(url);
          // 放入对象池
          this.imgs.push(obj);
        }
      });
    }
  },

  watch: {
    // 检测对象池 截去超出部分
    imgs(val) {
      if (this.max > 0 && val.length > this.max) {
        this.imgs = val.splice(0, this.max);
      }
    }
  },

  computed: {
    /**
     * @function singleMode {单图模式}
     * @return {Boolean} {是否处于单图模式}
     */
    singleMode() {
      let _value = this.value;
      let _max = this.max;
      if (typeof _value == 'string' || _max == 1) {
        return true;
      }
      return false;
    },
    inputAreaState() {
      let _singleMode = this.singleMode;
      let _len = this.imgs.length;

      if (_singleMode) { // 单图模式
        if (_len == 0) {
          return true;
        }
      } else { // 多图模式
        if (this.max == 0) { // 不限数量
          return true;
        } else {
          if (_len < this.max) { // 限数且数量小于最大数
            return true;
          }
        }
      }
      return false;
    }
  }
}
</script>
