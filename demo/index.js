/**
 * Dialog Component Demo for uxcore
 * @author
 *
 * Copyright 2014-2015, Uxcore Team, Alinw.
 * All rights reserved.
 */

 import {BasicDemo, AsyncCloseDemo, CustomFooter, ConfirmDemo, InfoDemo} from './DialogDemo';

 ReactDOM.render((
    <div>
        <p>基本用法</p>
        <BasicDemo/>
        <p>两秒后关闭</p>
        <AsyncCloseDemo/>
        <p>自定义页脚</p>
        <CustomFooter />
        <p>确认对话框</p>
        <ConfirmDemo />
        <p>信息提示</p>
        <InfoDemo />
    </div>
 ), document.getElementById('UXCoreDemo'));
