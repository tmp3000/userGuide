<template>
  <Page>
    <Header>
      <Navbar>
        <Title>InsetList</Title>
      </Navbar>
    </Header>
    <Content>
      <List inset>
        <Item button v-for="(item,index) in list" :key="index">
          {{item}}
        </Item>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { Note } from 'vimo/components/note'
  import { Avatar } from 'vimo/components/avatar'
  import { Label } from 'vimo/components/label'
  export default{
    data(){
      return {
        list: [
          'InsetList 1',
          'InsetList 2',
          'InsetList 3',
          'InsetList 4',
          'InsetList 5',
          'InsetList 6',
          'InsetList 7',
          'InsetList 8',
          'InsetList 9',
          'InsetList 10',
          'InsetList 11',
          'InsetList 12',
          'InsetList 13',
          'InsetList 14',
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider, Note, Avatar, Label}
  }
</script>
