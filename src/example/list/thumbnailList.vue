<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ThumbnailList</Title>
            </Navbar>
        </Header>
        <Content>


            <List>
                <Item>
                    <Thumbnail slot="item-left">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-totoro.png">
                    </Thumbnail>
                    <Label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </Label>
                    <Button ion-button clear slot="item-right">View</Button>
                </Item>
                <Item>
                    <Thumbnail slot="item-left">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-rotla.png">
                    </Thumbnail>
                    <Label>
                        <h2>My Neighbor Totoro</h2>
                        <p>Hayao Miyazaki • 1988</p>
                    </Label>
                    <Button ion-button clear slot="item-right">View</Button>
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
  import { Thumbnail } from 'vimo/components/thumbnail'
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider, Note, Avatar, Label,Thumbnail}
  }
</script>
