<template>
  <div class="guide-info">
    <flexbox justify='justify' align='center'>
      <flexbox-item class='logo'><img src="./logo.png" /></flexbox-item>
      <flexbox-item class='city'>
        <label class='label'>
          <select class='select' v-model='current'>
            <option v-for='item in list' :key='item.city' :value='item.city'>
              {{item.city}}
            </option>
          </select>
          <span>{{current}}</span>
          <Icon class='icon' name="caret-down"/>
        </label>
      </flexbox-item>
    </flexbox>
    <img class='banner' src="./banner.jpg" />
    <div class='tabs'>
      <div
        v-for='(item, index) in tabs'
        :key='item'
        class='tab'
        :class='tabIndex === index ? "active": ""'
        @click='onChange(index)'
      >
        {{item}}
      </div>
    </div>
    <Split height='20' />
    <div :hidden='tabIndex != 0'>
      <div class='section'>
        <h5 class='title'>到访接待</h5>
        <div class='row'>
          <div class='col'>
            <img class='img' src='./1.png' alt="" />
            <p class='desc'>如您已提前和置业顾问预约，可报其姓名直接为您提供服务</p>
          </div>
          <div class='col'>
            <img class='img' src='./2.png' alt="" />
            <p class='desc'>如没有预约，现场将依照相关制度，给您安排置业顾问为您服务</p>
          </div>
          <div class='col'>
            <img class='img' src='./3.png' alt="" />
            <p class='desc'>为了更好地提供服务，置业顾问会向您询问姓名、电话等基础信息，还请予以配合</p>
          </div>
          <div class='col'>
            <img class='img' src='./4.png' alt="" />
            <p class='desc'>金地向您承诺，未经过您本人同意的客户基础资料不会对外泄露</p>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>认购须知</h5>
        <p class='p'>为了有效保障您的购房权益，帮助您顺利办理购房手续，金地要求销售接待人员在您办理认购手续的各个环节向您详细介绍项目相关信息、提示相关风险并提供购房所需了解的相关资料，现逐项向您提示。若您对以下信息仍有疑问，请向销售现场接待人员或管理人员咨询。</p>
        <dl class='dl'>
          <dd class='dd'>1、《阳光宣言》信息公示</dd>
          <dd class='dd'>2、五证、价格等公示</dd>
          <dd class='dd'>3、金地物业收费标准</dd>
          <dd class='dd'>4、认购、签约文本信息</dd>
        </dl>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>阳光宣言</h5>
        <div class='row'>
          <div class='col'>
            <img class='img' src='./5.png' alt="" />
            <p class='desc tc'>红线内不利因素公示</p>
          </div>
          <div class='col'>
            <img class='img' src='./6.png' alt="" />
            <p class='desc tc'>红线外不利因素公示</p>
          </div>
          <div class='col'>
            <img class='img' src='./7.png' alt="" />
            <p class='desc tc'>项目车位公示</p>
          </div>
          <div class='col'>
            <img class='img' src='./8.png' alt="" />
            <p class='desc tc'>金地地产客户服务介绍</p>
          </div>
          <div class='col'>
            <img class='img' src='./9.png' alt="" />
            <p class='desc tc'>金地集团服务监督400公示</p>
          </div>
          <div class='col'>
            <img class='img' src='./10.png' alt="" />
            <p class='desc tc'>金地物业介绍</p>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>购房流程</h5>
        <!-- 流程图 -->
        <div v-if='current==="长沙"'>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>按揭付款客户</div>
            </div>
            <div class='block'>
              <div class='inner'>一次性付款客户</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a3.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>提交购房资格资料，按照政府规定流程，现场选房确认</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>签署认购书及风险提示、承诺函</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>录入购房资格至住建委审核</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a2.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>交齐按揭资料完成按揭合同，付清首期款及代收费用，签署商品房买卖合同及补充协议</div>
            </div>
            <div class='block'>
              <div class='inner'>付清全额房款及代收费用签署商品房买卖合同及补充协议</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a3.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>自缴契税和物业维修资金</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a2.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>银行审批及办理合同备案</div>
            </div>
            <div class='block'>
              <div class='inner'>办理合同备案</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a3.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>领取购房合同</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>办理预告登记</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>领取银行或公积金贷款合同</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>办理交付手续</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>办理不动产权证书</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>领取不动产权证书（一次性付款客户）</div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>选房、确认</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>认购注意事项</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>客户缴纳定金，签署《楼宇认购书》</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a2.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>贷款</div>
            </div>
            <div class='block'>
              <div class='inner'>一次性</div>
            </div>
          </div>
          <div class='row flex'>
            <div class='block'>
              <img class='arrow' src="./a1.png" />
              <p class='tip'>{{current==='郑州'?7:3}}天</p>
            </div>
            <div class='block'>
              <img class='arrow' src="./line.png" />
              <!-- <p class='tip'>3天</p> -->
            </div>
          </div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner link' @click='showBox("banlianjie")'>办理按揭手续，交齐有效的贷款资料，银行确认贷款资格</div>
            </div>
            <div class='block'>
              <img class='arrow line' src="./line.png" />
              <p class='tip'>{{current==='郑州'?7:3}}天</p>
              <!-- <div class='inner'>缴纳剩余购房定金、交齐核查资料并签署限购承诺书、进行资格核查</div> -->
            </div>
          </div>
          <div class='row flex'>
            <div class='block'><img class='arrow' src="./a1.png" /></div>
            <div class='block'><img class='arrow' src="./a1.png" /></div>
          </div>
          <div class='row flex'>
            <div class='block'>
              <div v-if='current==="武汉"' class='inner'>缴纳剩余购房定金、交齐核查资料并签署限购承诺书、进行资格核查</div>
              <div v-if='current==="郑州"' class='inner'>缴纳剩余房款、交齐购房资料并签署限购承诺书、客户办理签约手续</div>

            </div>
          </div>
          <div class='block'>
            <img class='arrow' src="./a1.png" />
            <p v-if='current==="武汉"' class='tip'>5个工作日</p>
          </div>
          <template v-if='current==="武汉"' >
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>核查通过，通知客户缴纳应缴房款</div>
            </div>
          </div>
          <div class='block'>
            <img class='arrow' src="./a1.png" />
            <p class='tip'>24个小时</p>
          </div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>项目打缴款通知书，客户接到通知后至售楼部在资金监管POS机刷卡</div>
            </div>
          </div>
          <div class='block'>
            <img class='arrow' src="./a1.png" />
            <p class='tip'>2-3个工作日</p>
          </div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>查询到账通知客户签约</div>
            </div>
          </div>
          <div class='block'>
            <img class='arrow' src="./a1.png" />
            <p class='tip'>48个小时</p>
          </div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>客户办理签约手续</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          </template>
          <div class='row flex'>
            <div class='block'>
              <div v-if='current==="武汉"' class='inner'>后台盖章、上传影像资料进行合同备案</div>
              <div v-if='current==="郑州"' class='inner'>后台盖章、进行合同备案</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>合同备案通过并全额到款，通知客户领取购房合同</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>等待期服务</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>收房（接收房通知）</div>
            </div>
          </div>
          <div class='block'><img class='arrow' src="./a1.png" /></div>
          <div class='row flex'>
            <div class='block'>
              <div class='inner'>领取办证资料（按合同约定，通知领取）</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if='current==="长沙"' class='changsha'>
        <Split height='20' />
        <div class="section">
          <h5 class='title'>认购注意事项</h5>
          <p class='p'>1、认购前，请您留意政府关于限购、限贷政策的要求，确认是否具备购房、按揭资格，请您留意商品房买卖合同示范文本及其补充约定、小区红线内外不利因素及法律法规规定应明示的其他文件、五证等，对所认购的物业状况、交易条件、周边环境，进行充分了解确认。</p>
          <p class='p'>2、如您选择银行按揭方式付款购房，请您先向我司按揭合作银行确认您（所有购房人、借款人）的信贷状况是否满足按揭贷款要求；按揭银行联系方式请向置业顾问索取。</p>
          <p class='p'>3、您需明确欲购房产的所有认购方人员姓名后，再签署《认购协议书》，认购协议书一经签署，所有内容条款即时生效，不得更改。</p>
          <p class='p'>4、所有购房手续必须购房者本人办理，如需委托他人代办，则需提供国家认可的公证机构出具的《公证委托书》。委托书内容有固定的格式要求，请您向置业顾问索取《公证委托书》模板，并请公证机构按照模板开具委托书。</p>
          <p class='p'>5、根据税务相关政策及公司制度规定，我司不接受现金支付，请您通过POS机刷卡方式支付购房定金、房款及代收费用；第三方代为支付购房费用的，需提供双方签字捺印的承诺函；公司为个人支付购房费用的，需要公司出具加盖公章证明的《公司转账证明函》，转账付款需注明所购楼栋和房号，且注明用途为“购房款”，以便我司确认您的购房款是否到账；相应模板请您向置业顾问索取。</p>
          <p class='p'>6、相关认购程序及证件资料要求，如所在地域、国籍等以政府部门当时现行政策为准。</p>
        </div>
        <div class='section'>
          <h5 class='title'>银行按揭：具体资料以银行面签时的最终要求为准</h5>
          <p class='p'>
            <p class='p'>1、签约前（申请银行/公积金贷款）客户需查询征信并准备以下按揭资料：</p>
            <p class='p'>①借款人及配偶身份证复印件</p>
            <p class='p'>②借款人及配偶户口簿复印件</p>
            <p class='p'>③借款人婚姻状况证明（结婚证、离婚证、离婚协议书等）</p>
            <p class='p'>④借款人收入证明原件（公积金贷款不需要）</p>
            <p class='p'>⑤借款人银行流水原件（公积金贷款不需要）</p>
            <p class='p'>⑥借款人房屋情况说明原件（以家庭为单位）</p>
            <p class='p'>⑦借款人还贷卡复印件</p>
            <p class='p'>⑧其他补充资料等（视现行按揭银行、公积金最新政策而定）</p>
            <p class='p'>2、按揭资料准备齐全期限：银行需7天内齐全；公积金需15天内齐全；</p>
            <p class='p'>3、贷部面签：</p>
            <p class='p'>银行 ：客户与银行预约面签</p>
            <p class='p'>公积金：开发商整理资料递交中心初审，通过后通知客户办理面签</p>
            <p class='p'>4、放款：银行预计为15天-60天左右（其中商铺预计3-5个月左右），公积金预计为5个月及以上。</p>
            <p class='p'>特别提醒：银行/公积金不同时期的政策有可能调整，审批中是否正常通过以及额度是否充足都会有影响，故最终的按揭政策和放款时间以银行/公积金解答为准。另，因政府政策及市场影响，公积金及银行按揭贷款金额及利率以最终批示为主，本司及置业顾问不做任何承诺。</p>
            <p class='p'>5、按揭合同领取</p>
            <p class='p'>您与按揭银行签署借款合同，在银行放款及商品房买卖合同预告登记完成后，银行将通知您领取借款合同原件。</p>
            <p class='p'>6、按揭扣款：具体按揭扣款时间以按揭办理银行或公积金通知为准，如有疑问请及时联络银行客户经理或服务热线。</p>
        </div>
        <div class='section'>
          <h5 class='title'>合同备案</h5>
          <p class='p'>1、《商品房买卖合同》签署后，我司将办理所购房产的合同备案，在您款项缴纳完毕（包括但不限于房款、契税、物业维修资金、其他代收费用）、资料提交完整的情况下，我司将按照合同约定的时间办理。具体办理方式以及完成时间请您拨打我司权证办理业务咨询电话或致电长沙金地客户服务专线。</p>
        </div>
        <div class='section'>
          <h5 class='title'>《商品房买卖合同》领取</h5>
          <p class='p'> 1、我司办理完合同备案的7个工作日内将通知您携带本人身份证至营销中心领取，领取前请您先致电您的置业顾问确认。</p>
        </div>
        <div class='section'>
          <h5 class='title'>预告登记办理</h5>
          <p class='p'>1、合同备案完成后，在您资料提交完整、按揭付款方式的银行或公积金审批通过且贷款资料齐全的情况下，我司将按照合同约定的时间办理。具体办理方式以及完成时间请您拨打我司权证办理业务咨询电话或致电长沙金地客户服务专线。</p>
        </div>
        <div class='section'>
          <h5 class='title'>房屋交付</h5>
          <p class='p'>1、我司将在《商品房买卖合同》约定的交付时间内，按合同登记的联系地址及方式将房屋交付的相关资料邮寄给您，请您根据《交付通知书》及相关指引的要求前来办理交付手续。</p>
          <p class='p'>2、您的联系电话、通信地址如发生变化，请务必及时以书面形式向我司申请更改，以确保您能够收到我司寄出的包括《交付通知书》在内的各项事宜办理通知。</p>
        </div>
        <div class='section'>
          <h5 class='title'>不动产权证书的办理：</h5>
          <p class='p'>1、房屋交付后，您还需要办理所购房产的不动产权证书，在您款项缴纳完毕（包括但不限于房款、契税、物业维修资金其他代收费用）、资料提交完整的情况下，我司将按照合同约定的时间办理。具体办理方式以及完成时间请您在房屋交付后拨打我司权证办理业务咨询电话或致电长沙金地客户服务专线。</p>
          <p class='p'>2、如您购买房屋为按揭付款，您的不动产权证书办出后将交由您的房产按揭银行保存，直至贷款还清后返还；如为一次性付款，您的不动产权证书办出后，将电话通知您前往指定地点领取。</p>
        </div>
        <div class='section'>
          <h5 class='title'>长沙金地客户服务专线：<a href="tel:4000383535">4000383535</a></h5>
          <p class='p'> 您身边的伙伴，受理您对长沙金地所有项目提供的产品及服务建议、意见、咨询和投诉。</p>
        </div>
        <div class='section gray'>
          <h5 class='title'>■ 签约预约请提前一天通知您的置业顾问</h5>
          <p class='p'>备注：</p>
          <p class='p'>本《购房须知》旨在协助您了解购房的相关步骤和过程，并不构成任何权利与义务的承诺或约束，请以最新公示信息为准，恕不另行通知。
上述资料及收费标准如有更改，以政府及相关部门规定为准，我司有权在法律规定范围内作出解释。请您留意最新资料。</p>
        </div>
      </div>
    </div>
    <div :hidden='tabIndex != 1'>
      <div class='section'>
        <h5 class='title'>伴家成长·进度告知服务</h5>
        <div class='row'>
          <div class='col w100'>
            <img class='img' src='./11.png' alt="" />
            <dl class='dl'>
              <dd class='dd'>·通过本微信公众号定期发布合同进度信息供业主自助查询</dd>
              <dd class='dd'>·通过本微信公众号定期发布工程进度信息供业主自助查询</dd>
              <dd class='dd'>·通过项目客服经理、置业顾问不定期告知业主工程进度</dd>
            </dl>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>伴家成长·准业主私享服务</h5>
        <div class='row'>
          <div class='col w100'>
            <img class='img' src='./12.png' alt="" />
            <dl v-if='current != "长沙"' class='dl'>
              <dd class='dd'>·主动为您提供持续的关怀行动</dd>
              <dd class='dd'>·主动告知并邀请您参加客户服务部定期展开的准业主生日会、 私享派等主题关怀活动</dd>
              <dd class='dd'>·主动告知并邀请您参加营销中心不定期活动</dd>
              <dd class='dd'>·主动告知您老带新政策</dd>
              <dd class='dd'>·在车位出售/出租时及时联系</dd>
            </dl>
            <dl v-else class='dl'>
              <dd class='dd'>·主动为您提供持续的关怀行动</dd>
              <dd class='dd'>·主动告知并邀请您参加营销中心不定期活动</dd>
              <dd class='dd'>·主动告知您老带新政策</dd>
              <dd class='dd'>·在车位出售时及时联系</dd>
            </dl>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>房屋质量·满意家服务</h5>
        <div class='row'>
          <div class='col w100'>
            <img class='img' src='./13.png' alt="" />
            <dl class='dl'>
              <dd class='dd'>“产品体验师”服务：交付前半年，金地地产客服中心将组织产品体验师团队，以客户视角，从配套、使用、观感、质量等维度，全面审视住宅产品是否达到业主的交付要求。</dd>
              <dd class='dd'>“房屋预检”服务：交付前3-5个月，邀请具有经验的行业第三方，以客户视角逐套进行房屋质量三重预检，5大类、17项、数百条检验标准，层层把关，只为给您满意的家。</dd>
            </dl>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>入伙陪伴月·业主尊享系列服务</h5>
        <div class='row'>
          <div class='col w100'>
            <img class='img' src='./14.png' alt="" />
            <dl class='dl'>
              <dd class='dd'>·根据项目情况，将在条件允许的情况下举办工程监理日活动，邀请业主检查样板楼层施工质量，共“鉴”家的成长。</dd>
              <dd class='dd'>·项目交付前，条件允许的情况下将安排<span class='link' @click='showBox("gongdikaifang")'>工地开放</span>活动，邀请业主在专业验房师的陪同下，一对一提前查看自家房屋施工进展及质量。</dd>
              <dd class='dd'>·交付前，根据项目场地条件，展开线上或线下形式的业主见面会，将交付及入住后服务提前交底，为业主收楼、入住提供更多便利。</dd>
            </dl>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>一站回家·房屋交付</h5>
        <div class='row'>
          <div class='col w100'>
            <img class='img' src='./15.png' alt="" />
            <dl class='dl'>
              <dd class='dd'>1.<span class='link' @click='showBox("jiaofutongzhi")'>交付通知</span>：金地地产客服中心将提前告知业主交付相关事宜。</dd>
              <dd class='dd'>2.交付预约：使用金地客户服务交付预约小程序，提前在线预约收楼时段，免于现场等待的不便，回家旅程更轻松！</dd>
              <template v-if='current != "武汉"'>
                <dd class='dd'>3.一站服务：集中交付期间提供“一站式集中收楼服务”，为您一站办理相关手续</dd>
                <dd class='dd'>4.验房指导：专业验房师一对一陪同客户顺利验房，积极处理客户提出的问题</dd>
                <dd class='dd'>5.即时保修：现场解决客户验楼中提出的小问题</dd>
                <dd class='dd'>6.定期回访：交付后定期进行满意度回访</dd>
              </template>
              <template v-else>
                <dd class='dd'>3.维修资金现场服务：集中交付期间，特邀维修资金托收银行现场办理资金缴纳手续，业主无需提前奔波缴费</dd>
                <dd class='dd'>4.一站服务：集中交付期间提供“一站式集中收楼服务”，为您一站办理相关手续</dd>
                <dd class='dd'>5.验房指导：专业验房师一对一陪同客户顺利验房，积极处理客户提出的问题</dd>
                <dd class='dd'>6.即时保修：现场解决客户验楼中提出的小问题</dd>
                <dd class='dd'>7.定期回访：交付后定期进行满意度回访</dd>
              </template>
            </dl>
          </div>
        </div>
      </div>
      <Split height='20' />
      <div class='section'>
        <h5 class='title'>有情生活·会生长的社区</h5>
        <div class='row'>
          <div class='col w100'>
            <img class='img' src='./16.png' alt="" />
            <p class='p'>房屋交付后，金地地产客服中心仍以专业服务全程相伴业主，让有情生活持续发生。</p>
            <dl class='dl'>
              <dd class='dd'>1、不定期房屋保养，主动为客户消除房屋过保后的不便利，令房屋常住常新；</dd>
              <dd class='dd'>2、持续园区焕新，关注业主入住后的需求变化，及时焕新园区配套设施，令社区持续增值。</dd>
              <dd class='dd'>3、金地云服务有情活动体系，以丰富的活动全面关怀业主家庭老中青三代人，陪伴业主收楼后的漫长岁月，为业主创造人情社区、有情生活。</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <transition name='fade'>
      <div v-show='boxShow' class='mask' @click='closeBox'></div>
    </transition>
    <transition name='scale'>
      <div v-show='boxShow' class='wrapper'>
        <img class='close' src="./close.png" @click='closeBox' />
        <div class='scroll'>
          <div v-if='currentBox === "banlianjie"' class='banlianjie'>
            <div class='tc' style='margin-top:15px'>
              <h3 class='r-title'>办理按揭须知</h3>
            </div>
            <dl class='dl'>
              <dd class='dd'>一、选择银行按揭付款方式购房，请您先向按揭银行确认您(所有购房人)的信贷状况是否满足贷款要求，按揭银行联系方式请向置业顾问索取;公积金请前往当地住房公积金管理中心网站或线下大厅查询</dd>
            </dl>
            <dl class='dl'>
              <dt class='dd'>二、选择银行按揭购房需符合以下条件</dt>
              <dd class='dd'>1.年满18周岁，具有完全民事行为能力且符合银行贷款条件的国内人士(含港澳台)</dd>
              <dd class='dd'>2.按揭年龄限制为男性女性不超过65周岁(按揭年龄限制、贷款金额及贷款年限以相关银行政策及审批确认为准，贷款年限不超过30年)</dd>
              <dd class='dd'>3.具有稳定合法的职业和收入来源</dd>
              <dd class='dd'>4.提供符合银行要求的资产收入证明文件并且具备良好的个人资信状况。</dd>
            </dl>
            <div class='tc' style='margin-top:15px'>
              <h3 class='r-title'>办理银行按掲手续时</h3>
            </div>
            <div class='tc'>
              <h3 class='r-title'>需提供以下资料</h3>
            </div>
            <table class='table'>
              <thead>
                <tr>
                  <th>基础分类</th>
                  <td>资料内容</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>基础资料</th>
                  <td>身份证、户口本、婚姻证明文件、《商品房买卖合同》、首付款收据原件、刷卡POS单原件;</td>
                </tr>
                <tr>
                  <th>征信资料</th>
                  <td>个人征信调查报告、贷款银行卡、收入证明(加盖单位公章并且需月还款额两倍以上)、银行流水清单等;</td>
                </tr>
                <tr>
                  <th>其他资料</th>
                  <td>业主名下的各类资料如活期存折、定期存折、股票对账单、其它房产证明、车辆行驶证、税单等</td>
                </tr>
              </tbody>
            </table>
            <p class='caution'>说明：以上资料根据一般情况列举，具体办理银行按揭手续过程中，银行会根据您的自身情况、相关购房及贷款政策，告知需增加或可减少提交的资料。</p>
          </div>
          <div v-if='currentBox === "gongdikaifang"' class='gongdikaifang'>
            <div class='tc' style='margin-top:15px'>
              <h3 class='r-title'>工地开放服务温馨提示</h3>
              <dl class='dl'>
                <dd class='dd'>1参观时间安排：请根据预约好的时间参观，因我公司对总包单位有严格的管理规定，请您理解并配合。</dd>
                <dd class='dd'>2参观路线及参观部位：请根据制定的路线行走及参观。为了您的安全，请不要在施工场内自行活动、行走。</dd>
                <dd class='dd'>3请按预约在我司工作人员陪同下进入工地现场，以确保安全与参观工作的顺利。</dd>
                <dd class='dd'>4为了您的安全，进入施工现场请您不要吸烟。不要拍照，请将照相机妥善保管，女生请不要穿高跟鞋，建议穿运动鞋。</dd>
                <dd class='dd'>5施工现场任何材料、构件切勿倚靠、推拉、攀爬，以防止发生意外。</dd>
                <dd class='dd'>6由于工地的噪声及粉尘对人体不利，1.2米以下儿童以及60岁以上老人请勿进入工地。</dd>
                <dd class='dd'>7因房屋仍处在施工阶段，参观过程中业主如有疑问，可向陪同参观工作人员咨询。如存在工作人员无法解答的问题，可要求陪同工作人员记录在《意见反馈记录单》中，金地客服中心后续将安排工作人员为您解答，您也可直接致电金地集团客服热线<a href='tel:4000383535'>4000-383-535</a>进行咨询。</dd>
                <dd class='dd'>8在参观过程中，请服从金地及总包单位现场管理人员的管理及安排，服从施工现场的其它管理规定。</dd>
                <dd class='dd'>9由于业主对现场施工管理规定及现场的情况并不熟悉，请务必遵守上述要求，否则我方将无法承担因为没有按上述规定参观而可能引发的安全问题。</dd>
                <dd class='dd'>10如果参观当日施工现场发生紧急意外情况，请遵循工作人员指引，切勿混乱。</dd>
                <dd class='dd'>11参观完毕后，请勿在施工现场逗留。</dd>
                <dd class='dd'>12如果因工地发生特殊情况，有可能临时改变参观时间，届时可能给您带来不便，敬请谅解。</dd>
              </dl>
            </div>
          </div>
          <div v-if='currentBox === "jiaofutongzhi"' class='jiaofutongzhi'>
            <div class='tc' style='margin-top:15px'>
              <h3 class='r-title'>交付通知服务温馨提示</h3>
              <dl class='dl'>
                <dd class='dd'>1 、需携带资料：业主身份证原件、购房合同及购房收据原件、维修资金缴纳收据原件，如不是业主本人前来办理相关手续，则还需携带如下资料：</dd>
                <dd class='dd'>（1）若买受人为未成年子女，请监护人携带户口本或监护人公证书及监护人身份证原件；</dd>
                <dd class='dd'>（2）如果委托直系亲属（仅只父母、配偶、成年子女）代办收楼手续，受托人还需携带业主的身份证原件、亲属关系证明（户口本原件、社区居委会或村委会盖章的亲属证明）及业主亲笔签名的授权委托书原件1份，以及受托人身份证原件及复印件1份；</dd>
                <dd class='dd'>（3）如果委托非直系亲属代办收楼手续，受托人还需携带业主的身份证原件、经公证机关公证的授权委托关系公证书1份，以及受托人身份证原件及复印件1份。 </dd>
                <dd class='dd'>2、相关费用准备(具体金额以交付使用通知书为准)；包括公共维修基金、物业费、面积差（多退少补）</dd>
                <dd v-if='current==="武汉"' class='dd'>3、公共维修基金：根据武汉市住房保障和房屋管理局颁发的《武房发[2011]130号》文件要求，所购商品房为住宅的买受人在办理房屋交付使用手续前，必需办理首期住宅专项维修资金的缴存手续，该项费用由武汉市房管局收取。业主可在交付前自行缴纳，为给业主提供方便，集中交付期间金地将特邀房地局维修资金收缴单位现场驻点办公收缴维修资金，以免业主额外奔波缴纳。</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Icon,
  Split
} from 'components'
export default {
  name: 'GuideInfo',
  components: {
    Flexbox,
    FlexboxItem,
    Icon,
    Split
  },
  data () {
    return {
      current: '武汉',
      tabIndex: 0,
      tabs: ['购房签约', '售后入住'],
      list: [
        {
          city: '武汉'
        },
        {
          city: '长沙'
        },
        {
          city: '郑州'
        }
      ],
      boxShow: false,
      currentBox: ''
    }
  },
  methods: {
    onChange (val) {
      this.tabIndex = val
    },
    closeBox () {
      this.boxShow = false
    },
    showBox (val) {
      this.currentBox = val
      this.boxShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~common/scss/variables.scss";
@import "~common/scss/mixins.scss";
.tc{
  text-align: center;
}
.guide-info{
  padding: p2r(30);
}
.logo{
  flex: 0 0 p2r(222) !important;
  width: p2r(222) !important;
}
.city{
  height: p2r(60);
  text-align: right;
  font-size: p2r(28);
  color: #EA5532;
  position: relative;
}
.label{
  display: inline-block;
  height: p2r(60);
  line-height: p2r(40);
}
.icon.iconfont{
  font-size: p2r(18);
}
.select{
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;
  left:0;
}
.banner{
  margin: p2r(30) auto;
  display: block;
  border-radius: 4px;
}
.tabs{
  font-size: 0;
  margin-top: p2r(30);
  .tab{
    display: inline-block;
    vertical-align: top;
    font-size: p2r(24);
    width: 50%;
    height: p2r(70);
    line-height: p2r(70);
    position: relative;
    text-align: center;
    &:after{
      position: absolute;
      content: '';
      width: 90%;
      height: 2px;
      left: 5%;
      bottom: 0;
    }
    &.active{
      color: #EA5532;
    }
    &.active:after{
      background: #EA5532;
    }
  }
}
.split{
  width: auto !important;
  height: p2r(20) !important;
  margin-left: p2r(-30);
  margin-right: p2r(-30);
}
.section{
  padding: p2r(30) 0;
}
.title{
  font-size:p2r(28);
  font-weight:500;
  color:rgba(102,102,102,1);
  line-height:p2r(40);
  letter-spacing:p2r(2);
  margin: p2r(30) 0 p2r(20);
}
.row{
  margin-left: p2r(-15);
  margin-right: p2r(-15);
  font-size: 0;
  .col{
    width: 50%;
    display: inline-block;
    vertical-align: top;
    padding: p2r(30) p2r(15);
    &.w100{
      width: 100%;
    }
    .desc{
      color:rgba(153,153,153,1);
      line-height:p2r(32);
      letter-spacing: p2r(2);
      font-size: p2r(22);
      margin-top: p2r(22);
    }
  }
}
.p{
  font-size:p2r(24);
  color:rgba(102,102,102,1);
  line-height:p2r(34);
  letter-spacing:p2r(2);
  margin-top: p2r(15);
}
.dl{
  margin-top: p2r(30);
}
.dd{
  font-size:p2r(22);
  color:rgba(153,153,153,1);
  line-height:p2r(32);
  letter-spacing:p2r(2);
}
.flex{
  display: flex;
}
.block{
  padding:0 p2r(15);
  flex:1;
  font-size: 0;
  text-align: center;
  position: relative;
  overflow-y: hidden;
}
.block .inner{
  height: 100%;
  padding: p2r(15);
  background:rgba(249,249,249,1);
  border-radius:p2r(4);
  border:1px solid rgba(238,238,238,1);
  font-size:p2r(22);
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:p2r(32);
  letter-spacing:p2r(2);
  text-align: center;
  padding: p2r(20);
}
.link{
  color:#EA5532 !important;
}
.arrow{
  max-height: p2r(70);
  max-width: p2r(420);
  &.line{
    transform: scaleY(5);
  }
}
.tip{
  position: absolute;
  font-size:p2r(18);
  color:rgba(153,153,153,1);
  line-height:p2r(26);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
}
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  background: rgba(0,0,0,.8);
  z-index: 999;
}
.wrapper{
  position: fixed;
  width: 90%;
  height: 88%;
  top: 6%;
  left: 5%;
  background: #fff;
  z-index: 1000;
  border-radius: 8px;
  padding: p2r(60) 0;
}
.close{
  width: p2r(60);
  position: absolute;
  top:0;
  right: 0;
}
.scroll{
  margin:0 p2r(30);
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.r-title{
  position: relative;
  font-size:p2r(32);
  font-weight:600;
  color:rgba(234,85,50,1);
  line-height:p2r(44);
  letter-spacing:p2r(2);
  text-align: center;
  display: inline-block;
  max-width: p2r(400);
  margin: 0 auto;
  padding:0 p2r(15);
  &:after{
    content: '';
    position: absolute;
    width: 100%;
    height: p2r(20);
    background: rgba(234, 85, 50, .1);
    left:0;
    bottom: 0;
    z-index: -1;
  }
}
.table{
  width: 100%;
  margin: p2r(30) 0;
  th{
    width: p2r(200);
  }
  th,td{
    background:rgba(249,249,249,1);
    border:1px solid rgba(238,238,238,1);
    font-size:p2r(22);
    color:rgba(102,102,102,1);
    line-height:p2r(32);
    letter-spacing:p22r(2);
    padding: p2r(20);
    vertical-align: middle;
  }
}
.caution{
  font-size:p2r(20);
  color:#333;
  line-height:p2r(28);
}
.gongdikaifang,
.jiaofutongzhi{
  .dd{
    text-align: left;
    font-size:p2r(24);
    color:rgba(153,153,153,1);
    line-height:p2r(34);
    margin-top: p2r(30);
    letter-spacing: 2px;
  }
}
.gray{
  background: #eee;
  padding:p2r(2) p2r(20) p2r(30);
}
.changsha{
  .p{
    font-size:p2r(28);
    font-weight:500;
    color:rgba(153,153,153,1);
    line-height:p2r(40);
    letter-spacing:p2r(2);
  }
}
</style>
