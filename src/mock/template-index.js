export const templateConfig = {
  book: {
    label: '时空行者',
    name: 'book',
    childName: 'name',
    form: 'multiselect',
    placeholder: '请选择穿越的人物',
    rule: {
      required: true
    },
    options: [
      {
        "label": "《三国演义》",
        "value": 0,
        "options": [
          {
            "label": "诸葛亮",
            "value": "诸葛亮"
          },
          {
            "label": "吕布",
            "value": "吕布"
          }
        ]
      },
      {
        "label": "《儒林外史》",
        "value": "《儒林外史》",
        "options": [
          {
            "label": "范进",
            "value": "范进"
          },
          {
            "label": "严监生",
            "value": "严监生"
          }
        ]
      },
      {
        "label": "《孔乙己》",
        "value": "《孔乙己》",
        "options": [
          {
            "label": "孔乙己",
            "value": "孔乙己"
          }
        ]
      },
      {
        "label": "《封神演义》",
        "value": "《封神演义》",
        "options": [
          {
            "label": "哪吒",
            "value": "哪吒"
          }
        ]
      },
      {
        "label": "《水浒传》",
        "value": "《水浒传》",
        "options": [
          {
            "label": "鲁智深",
            "value": "鲁智深"
          }
        ]
      },
      {
        "label": "《红楼梦》",
        "value": '《红楼梦》',
        "options": [
          {
            "label": "林黛玉",
            "value": "林黛玉"
          }
        ]
      },
      {
        "label": "《西游记》",
        "value": "《西游记》",
        "options": [
          {
            "label": "孙悟空",
            "value": "孙悟空"
          },
          {
            "label": "猪八戒",
            "value": "猪八戒"
          }
        ]
      }
    ]
  },
  book2: {
    label: '',
    name: 'book2',
    childName: 'name2',
    form: 'multiselect',
    placeholder: '请选择要穿越的另一个人物（选填）',
    rule: {
      required: false
    },
    options: [
      {
        "label": "《三国演义》",
        "value": 0,
        "options": [
          {
            "label": "诸葛亮",
            "value": "诸葛亮"
          },
          {
            "label": "吕布",
            "value": "吕布"
          }
        ]
      },
      {
        "label": "《儒林外史》",
        "value": "《儒林外史》",
        "options": [
          {
            "label": "范进",
            "value": "范进"
          },
          {
            "label": "严监生",
            "value": "严监生"
          }
        ]
      },
      {
        "label": "《孔乙己》",
        "value": "《孔乙己》",
        "options": [
          {
            "label": "孔乙己",
            "value": "孔乙己"
          }
        ]
      },
      {
        "label": "《封神演义》",
        "value": "《封神演义》",
        "options": [
          {
            "label": "哪吒",
            "value": "哪吒"
          }
        ]
      },
      {
        "label": "《水浒传》",
        "value": "《水浒传》",
        "options": [
          {
            "label": "鲁智深",
            "value": "鲁智深"
          }
        ]
      },
      {
        "label": "《红楼梦》",
        "value": '《红楼梦》',
        "options": [
          {
            "label": "林黛玉",
            "value": "林黛玉"
          }
        ]
      },
      {
        "label": "《西游记》",
        "value": "《西游记》",
        "options": [
          {
            "label": "孙悟空",
            "value": "孙悟空"
          },
          {
            "label": "猪八戒",
            "value": "猪八戒"
          }
        ]
      }
    ]
  },
  relation: {
    label: '人物关系',
    name: 'relation',
    form: 'select',
    placeholder: '你希望两个人物的关系是（选填）',
    rule: {
      required: false
    },
    options: [
      {
        "label": "父子",
        "value": "父子"
      },
      {
        "label": "朋友",
        "value": "朋友"
      },{
        "label": "敌对",
        "value": "敌对"
      }
    ]
  },
  cross: {
    label: '时空之门',
    name: 'cross',
    form: 'select',
    placeholder: '请选择你想去的世界',
    rule: {
      required: true
    },
    options: [
      {
        "label": "亡灵世界",
        "value": "亡灵世界"
      },
      {
        "label": "动物世界",
        "value": "动物世界"
      },
      {
        "label": "平行空间",
        "value": "平行空间"
      },
      {
        "label": "超能宇宙",
        "value": "超能宇宙"
      },
      {
        "label": "玄幻武侠",
        "value": "玄幻武侠"
      },
      {
        "label": "《魔戒》",
        "value": "《魔戒》"
      },
      {
        "label": "《西游记》",
        "value": "《西游记》"
      }
    ]
  },
  style: {
    label: '时空轨迹',
    name: 'style',
    form: 'select',
    placeholder: '你想来一场怎样的冒险',
    rule: {
      required: true
    },
    options: [
      {
        "label": "惊悚恐怖",
        "value": "惊悚恐怖"
      },
      {
        "label": "两极反转",
        "value": "两极反转"
      },
      {
        "label": "荒诞讽刺",
        "value": "荒诞讽刺"
      },
      {
        "label": "虐恋情深",
        "value": "虐恋情深"
      },
      {
        "label": "权谋称霸",
        "value": "权谋称霸"
      }
    ]
  }
}

export default {
  templateConfig
}