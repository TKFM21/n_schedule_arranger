'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

// 複合主キー
const Comment = loader.database.define(
  'comments',
  {
    scheduleId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Comment;

// ここではインデックスを作成する必要がありません。
// なぜなら scheduleId と userId で複合主キーを作成しており、
// その主キーの作成順番が、scheduleId > userId という順番となっているためです。
// RDB では主キーには自動的にインデックスが構築されます。
// 複合主キーで作成された主キーのインデックスは、途中までデータを検索する順番が 一緒であれば
// それをインデックスとして使うことができます。
// そのため上の例では、 scheduleId のインデックスは別途作成しなくても
// 主キーのインデックスを代わりに用いることができるのです。