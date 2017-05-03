class Content extends React.Component {
    constructor() {

        super();
        this.state = {
            imgdataUrl: 'data:image/gif;base64,R0lGODlhMwAxAIAAAAAAAP///yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGXElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgdLbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wnk2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbFZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw=='
        };
    }

    getImg() {
        var preview = document.getElementById('preview');
        var files = document.getElementById("imgFile").files;
        var imgdataUrl='';

        if (files) {
            // for (let i = 0; i < files.length; i++) {
            //     readAndPreview(files[i]);
            //     setTimeout(function() {
            //         this.setState({imgdataUrl});
            //     }.bind(this), 1000);
            // }

            [].forEach.call(files, readAndPreview);
            setTimeout(function() {
                this.setState({imgdataUrl});
            }.bind(this), 1000);
        }

        function readAndPreview(file) {

            // Make sure `file.name` matches our extensions criteria
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    var image = new Image();
                    image.height = 100;
                    image.title = file.name;
                    image.src = this.result;
                    imgdataUrl = this.result;
                    preview.appendChild(image);
                }, false);
                reader.readAsDataURL(file);
            }

        }
    }

    submitImg() {
        var imgdataUrl = this.state.imgdataUrl;

        if (document.getElementById("imgFile").files) {
            var regex = /^data:.+\/(.+);base64,(.*)$/;
            var matches = imgdataUrl.match(regex);
            var imgExt = matches[1];
            var imgData = matches[2];
            console.time('postImg');
            $.post('/submitImage', {
                imgExt: imgExt,
                imgData: imgData,
                imgName: "feishuoren",
                success: function () {
                    alert("提交成功");
                }
            });
            console.timeEnd('postImg');
        }
    }

    render() {
        return (
            <div>
                <input type="file" id="imgFile" name="file" onChange={this.getImg.bind(this)}/>
                <div id="preview"></div>
                <button type="submit" id="submit" onClick={this.submitImg.bind(this)}>提交</button>
            </div>
        );
    }
}

ReactDOM.render(<Content />, document.getElementById('content'));
