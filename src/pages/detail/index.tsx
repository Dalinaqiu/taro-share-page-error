/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-01 15:29:36
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-01 15:43:26
 * @FilePath: /td-test/src/pages/detail/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import BookReader from '@/components/book-reader'
import './index.scss'

const prefix = 'detail'

const content = `## 第一回 灵根育孕源流出 心性修持大道生

诗曰：

 

混沌未分天地乱，茫茫渺渺无人见。

自从盘古破鸿蒙，开辟从兹清浊辨。

覆载群生仰至仁，发明万物皆成善。

欲知造化会元功，须看《西游释厄传》。



盖闻天地之数，有十二万九千六百岁为一元。将一元分为十二会，乃子、丑、寅、卯、辰、巳（sì）、午、未、申、酉、戌、亥之十二支也。每会该一万八百岁。且就一日而论：子时得阳气，而丑则鸡鸣；寅不通光，而卯则日出；辰时食后，而巳则挨排；日午天中，而未则西蹉；申时晡而日落酉；戌黄昏而人定亥。譬于大数，若到戌会之终，则天地昏蒙而万物否矣。再去五千四百岁，交亥会之初，则当黑暗，而两间人物俱无矣，故曰混沌。又五千四百岁，亥会将终，贞下起元，近子之会，而复逐渐开明。邵康节曰：“冬至子之半，天心无改移。一阳初动处，万物未生时。”到此，天始有根。再五千四百岁，正当子会，轻清上腾，有日，有月，有星，有辰。日、月、星、辰，谓之四象。故曰，天开于子。又经五千四百岁，子会将终，近丑之会，而逐渐坚实。易曰：“大哉乾元！至哉坤元！万物资生，乃顺承天。”至此，地始凝结。再五千四百岁，正当丑会，重浊下凝，有水，有火，有山，有石，有土。水、火、山、石、土谓之五形。故曰，地辟于丑。又经五千四百岁，丑会终而寅会之初，发生万物。历曰：“天气下降，地气上升；天地交合，群物皆生。”至此，天清地爽，阴阳交合。再五千四百岁，正当寅会，生人，生兽，生禽，正谓天地人，三才定位。故曰，人生于寅。

 

感盘古开辟，三皇治世，五帝定伦，世界之间，遂分为四大部洲：曰东胜神洲，曰西牛贺洲，曰南赡部洲，曰北俱芦洲。这部书单表东胜神洲。海外有一国土，名曰傲来国。国近大海，海中有一座山，唤为花果山。此山乃十洲之祖脉，三岛之来龙，自开清浊而立，鸿蒙判后而成。真个好山！有词赋为证。赋曰：

 

势镇汪洋，威宁瑶海。势镇汪洋，潮涌银山鱼入穴；威宁瑶海，波翻雪浪蜃（shèn）离渊。木火方隅高积上，东海之处耸崇巅。丹崖怪石，削壁奇峰。丹崖上，彩凤双鸣；削壁前，麒麟独卧。峰头时听锦鸡鸣，石窟每观龙出入。林中有寿鹿仙狐，树上有灵禽玄鹤。瑶草奇花不谢，青松翠柏长春。仙桃常结果，修竹每留云。一条涧壑藤萝密，四面原堤草色新。正是百川会处擎天柱，万劫无移大地根。



## 第二回 悟彻菩提真妙理 断魔归本合元神

神话表美猴王得了姓名，怡然踊跃，对菩提前作礼启谢。那祖师即命大众引孙悟空出二门外，教他洒扫应对，进退周旋之节。众仙奉行而出。悟空到门外，又拜了大众师兄，就于廊庑（láng wǔ）之间，安排寝处。次早，与众师兄学言语礼貌，讲经论道，习字焚香，每日如此。闲时即扫地锄园，养花修树，寻柴燃火，挑水运浆。凡所用之物，无一不备。在洞中不觉倏六七年。一日，祖师登坛高坐，唤集诸仙，开讲大道。真个是：

 

天花乱坠，地涌金莲。妙演三乘（佛教术语。三乘指小乘、中乘和大乘）教，精微万法全。

慢摇麈尾（古人闲谈时执以驱虫、掸尘的一种工具。麈，zhǔ）喷珠玉，响振雷霆动九天。

说一会道，讲一会禅，三家配合本如然。

开明一字皈诚理，指引无生了性玄。`

export default () => {
  return (
    <div className={`${prefix}`}>
      <BookReader isMarkdown content={content} />
    </div>
  )
}