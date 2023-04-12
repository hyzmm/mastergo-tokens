mastergo-tokens 是为 MasterGo 开发的插件，旨在提供主题切换，及导出 Design Token 供开发使用。


## Design Token

mastergo-tokens 并不负责管理 tokens，它只读取 MasterGo 的样式库中定义的样式，并将它作为 token。添加、删除和更改等操作都将直接利用 MasterGo 自身的能力，无新的理解成本。

## 主题

mastergo-tokens 也没有创建和删除主题的功能，样式库中最外层的分类会被作为主题候选者。

<img src="https://user-images.githubusercontent.com/48704743/231353223-ca862098-71a3-46e3-a6bb-4cc734489e18.png" width="200px">

例如上图中有 **light**、**dark**、**Lazurite**、**Hematite**、**Gold** 这几个候选主题，从名字就可以看出，主题只有 **light** 和 **dark**，其余的都是通用的样式，与主题无关。插件可以从这些候选中挑选主题以供切换。

# 安装

> 此插件依然处于初期阶段，它的 UI 还未达到可发布的标准，因此没有被发布到插件社区。

1. 打开 Github 的 [Release](https://github.com/hyzmm/mastergo-tokens/releases) 页面，选择最新版本的 zip 文件。
2. 解压到任意合适的目录（此目录不可删除）。
3. 打开 MasterGo App（网页版 MasterGo 不能安装未发布的插件）。
4. 依次 点击菜单栏 - 开发者模式 - 创建/添加插件。
5. 将刚才下载的文件夹中的 *manifest.json* 文件拖动到指示框内。

此后你可以通过以下入口打开插件：

1. 菜单栏 - 开发者模式 - mastergo-tokens
2. 右键点击画布 - 插件 - 开发插件 - mastergo-tokens

# 使用

## 修改主题

首次使用需要从候选主题中人为选择主题，打开插件的第二个 Tab 定义主题：

<img src="https://user-images.githubusercontent.com/48704743/231355218-52462cdf-d30b-4188-82ce-6d73bb6968cb.png" width="350px">

通常主题名字为 **light** 和 **dark**，选中后回到第一个 Tab 修改主题：

<img src="https://user-images.githubusercontent.com/48704743/231355418-1971fac6-a741-456b-8905-88167b1b6a6b.png" width="350px">

选择主题下拉框的选项就是我们上一步定义的主题，当前可选为 **light** 和 **dark**。应用到有两个选项：

1. 页面：将当前页面的所有设计稿全部更新为指定的主题
2. 当前选择：将当前画布的选择区域更新为指定的主题

## 导出 JSON

JSON Tab 列出了当前的 Design Tokens 配置，目前没有内置将其转换为语言或者框架的代码能力，可以自行解析和生成代码。
