/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 11:44:15
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-01 15:59:59
 * @FilePath: /td-test/src/pages/create/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { View } from "@tarojs/components";
import { Button, Textarea } from 'tdesign-mobile-react';
import Taro from "@tarojs/taro";
import { useState } from "react";
import BookReader from "@/components/book-reader";

import './index.scss';
import { Icon } from "tdesign-icons-react";

const prefix = 'create';

const content = `ChatGPT的产出：你好一位资深小说作家，现在想在小说《西游记》中加入动画片《聪明的一休》中的一休，创作一本《西游记》同人小说，请提供一份你认为会非常吸引00后男生的小说大纲

好的，这本《西游记》同人小说可以叫做《西游奇缘：一休的冒险》，它将《西游记》和《聪明的一休》结合在一起，加入一些现代的元素和情节，以吸引00后的男生。以下是这本小说的大纲：

### **《西游奇缘：一休的冒险》**

#### **背景设定**
唐僧师徒四人（唐僧、孙悟空、猪八戒、沙僧）正在经历九九八十一难的艰险取经之旅，而聪明的一休则生活在一个平行的东方世界，作为一个富有智慧和机智的小和尚，他对世界充满了好奇心。通过一次神秘的时空裂缝，一休误入了《西游记》的世界，并与唐僧师徒一起展开了一场全新的冒险。

#### **章节大纲**

##### **第一章：神秘的时空裂缝**
一休在日本的一座古寺中发现了一个神秘的时空裂缝，他怀着好奇心进入其中，来到了唐僧师徒正在途经的山林。他在这里遇到了被妖怪困住的唐僧，并用自己的智慧帮助孙悟空等人成功解救了唐僧。

##### **第二章：一休与孙悟空的较量**
初次见面，孙悟空对一休的智慧表示怀疑。为了证明自己的能力，一休与孙悟空进行了一场智力和武艺的较量，最终赢得了孙悟空的尊重和认可。

##### **第三章：妖魔的阴谋**
在前往西天的路上，师徒一行遭遇了新的妖魔，他们阴谋策划要抓住唐僧来获取长生不老的力量。一休发现了妖魔的诡计，并设计了一系列陷阱和计策，帮助师徒成功逃脱。
`

export default () => {

  const [value, setValue] = useState(content);

  const back = () => {
    Taro.navigateTo({
      url: '/pages/index/index',
    })
  };

  const go = () => {
    Taro.navigateTo({
      url: '/pages/detail/index',
    })
  };
  
  return (
    <View className={prefix}>
      <p>穿越大纲</p>

      <BookReader
        className={`${prefix}-content`}
        content={value}
      />

      <Button
        className={`${prefix}-change`}
        icon={<Icon name="refresh" />}
      >
        换一个
      </Button>
      
      <div className={`${prefix}-footer`}>
        <Button
          block
          size="large"
          shape="rectangle"
          variant="outline"
          onClick={back}
        >
          返回
        </Button>
        <Button
          block
          size="large"
          shape="rectangle"
          theme="primary" 
          onTap={go}
        >
          进入剧本
        </Button>
      </div>
    </View>
  );
}