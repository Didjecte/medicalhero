<template>
  <div class="container context_top">
    <h1 style="margin:30px 0;">Dashboard Admin</h1>
    <router-link to="/deal"><el-button type="primary" style="margin:60px 0 60px 0;">Primary</el-button></router-link>
    <div>
      <el-table
        :data="tableData"
        :default-sort = "{prop: 'dateStart', order: 'descending'}"
        style="width: 100%"
      ><!--prop按照date进行排序，order中的descending降序、ascending升序-->
        <el-table-column prop="content" label="content" sortable></el-table-column>
        <el-table-column prop="company" label="company" sortable></el-table-column>
        <el-table-column prop="stage" label="stage"
                         :filters="[{ text: '1-quote', value: '1-quote' }, { text: '2-invoice', value: '2-invoice' }]"
                         :filter-method="filterStage"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.stage === '1-quote' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.stage}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="status"
                         :filters="[{ text: 'waiting', value: 'waiting' }, { text: 'to do', value: 'to do' }]"
                         :filter-method="filterStatus"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 'to do' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>>
        </el-table-column>
        <el-table-column prop="dateStart" label="date" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      tableData: [
        {
          content: 'didier HU',
          company: 'MedicalHero',
          stage: '1-quote',
          status: 'waiting',
          dateStart: '06/05/2020'
        },
        {
          content: 'Aidier HU',
          company: 'BedicalHero',
          stage: '2-invoice',
          status: 'to do',
          dateStart: '04/05/2020'
        },
        {
          content: 'Zidier HU',
          company: 'AedicalHero',
          stage: '2-invoice',
          status: 'to do',
          dateStart: '01/05/2020'
        }
      ]
    }
  },
  methods: {
    filterStage (value, row) {
      return row.stage === value
    },
    filterStatus (value, row) {
      return row.status === value
    }
  }
}
</script>

<style scoped>
  .context_top{
    margin-top:60px;
  }

</style>
