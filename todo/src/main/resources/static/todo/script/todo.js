var app = new Vue({
    el: '#app',
    data: {
        style: {
            initialAppHeight: '',
            bodyClientWidth: '100%',
            bodyClientHeight: '100%',
            table: {
                height: '',
            },
            formLabelWidth: '80px',
        },
        queryForm: {
            data: {
                                content: '',
                    status: '',
            },
        },
        table: {
            records: [],
            current: 1,
            size: 10,
            total: 0,
            loading: false,
            multipleSelection: [],
        },
        formDialog: {
            visible: false,
            disabled: false,
            /* add/edit/detail */
            type: '',
            form: {
                    id: '',
                    content: '',
                    status: '',
            },
            formRules: {
            },
        },
    },
    mounted: function () {
        var self = this
        self.initStyle()
        self.initData()
    },
    computed: {
        bodyClientWH: function () {
            return [this.style.bodyClientWidth, this.style.bodyClientHeight]
        }
    },
    watch: {
        bodyClientWH: function () {
            this.style.table.height = this.style.bodyClientHeight - this.style.initialAppHeight + 'px'
        }
    },
    methods: {

        /**
         * request (data)
         * responsible for event listener and handler
         */

        /* 保存操作 */
        save: function (params) {
            var self = this
            var resp = axios.post('/todo/save', params)
            resp.then(self.saveOrUpdateSuccessHandler).catch()
        },
        /* 删除操作 */
        remove: function (params) {
            var self = this
            var resp = axios.post('/todo/remove', params)
            resp.then(self.removeSuccessHandler).catch()
        },
        /* 更新操作 */
        update: function (params) {
            var self = this
            var resp = axios.post('/todo/update', params)
            resp.then(self.saveOrUpdateSuccessHandler).catch()
        },
        /* 获取分页数据 */
        getPage: function () {
            var self = this
            self.table.loading = true
            var params = _.merge({current: self.table.current, size: self.table.size}, self.queryForm.data)
            var resp = axios.get('/todo/page', {params: params})
            resp.then(self.getPageSuccessHandler)
        },

        /**
         * event listener
         * only responsible for view
         */

        /* 查询表单查询事件 */
        onQueryFormQueryBtnClick: function () {
            this.table.current = 1
            this.getPage()
        },
        /* 查询表单重置事件 */
        onQueryFormResetBtnClick: function () {
            this.$refs['queryForm'].resetFields()
            this.table.current = 1
            this.getPage()
        },
        /* 表单创建*/
        onTableCreateBtnClick: function () {
            this.formDialog.visible = true
            this.formDialog.disabled = false
            this.formDialog.type = 'add'
        },
        /* 表单删除*/
        onTableDeleteBtnClick: function () {
            var self = this
            var params = _.map(self.table.multipleSelection, 'id')
            if (params.length === 0) {
                self.$message({type: 'warning', message: '请选择要删除行!', duration: 1000})
                return
            }
            self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                self.remove(params)
            })
        },
        // 表单详情
        onTableRowDetailBtnClick: function(index, row) {
            _.assign(this.formDialog.form, row)
            this.formDialog.visible = true
            this.formDialog.disabled = true
            this.formDialog.type = 'detail'
        },
        /* 表单编辑*/
        onTableRowEditBtnClick: function (index, row) {
            _.assign(this.formDialog.form, row)
            this.formDialog.visible = true
            this.formDialog.disabled = false
            this.formDialog.type = 'edit'
        },
        /* 表单行内删除*/
        onTableRowDeleteBtnClick: function (index, row) {
            var params = []
            params.push(row.id)
            this.remove(params)
        },
        /* 对话框取消事件*/
        onFormDialogCancelClick: function () {
            this.$refs['formDialog'].resetFields()
            this.formDialog.visible = false
        },
        /* 对话框表单提交事件 */
        onFormDialogSubmitClick: function () {
            var self = this
            self.$refs['formDialog'].validate(function (valid) {
                if (valid) {
                    self.formDialogSubmitValidHandler()
                } else {
                    return false
                }
            })
        },
        onTableSelectionChange: function (val) {
            this.table.multipleSelection = val
        },
        onPageSizeChange: function (val) {
            this.table.size = val
            this.getPage()
        },
        onCurrentPageChange: function (val) {
            this.table.current = val
            this.getPage()
        },

        /*
        * handler
        * responsible for event listener and request
        */
        saveOrUpdateSuccessHandler: function () {
            this.$message({type: 'success', message: '请求成功!', duration: 1000})
            this.$refs['formDialog'].resetFields()
            this.getPage()
            this.formDialog.visible = false
        },
        removeSuccessHandler: function (response) {
            this.$message({type: 'success', message: '删除成功!', duration: 1000})
            this.getPage()
        },
        getPageSuccessHandler: function (data) {
            _.assign(this.table, data)
            this.table.loading = false
        },
        formDialogSubmitValidHandler: function () {
            var self = this;
            if (this.formDialog.type === 'add') {
                self.save(self.formDialog.form)
                return
            }
            if (this.formDialog.type === 'edit') {
                self.update(self.formDialog.form)
                return
            }
            if (this.formDialog.type === 'detail') {
                self.formDialog.visible = false
                return
            }
        },

        /**
         * function
         * enhance for request, event listformDialogener and handler
         */
        initStyle: function () {
            var self = this
            this.style.initialAppHeight = $('#app').height()
            this.style.table.height = $('body').height() - this.style.initialAppHeight + 'px'
            window.onresize = function () {
                self.style.bodyClientHeight = $('body').height()
                self.style.bodyClientWidth = $('body').width()
            }
        },

        initData: function () {
            this.getPage()
        }

    },
})