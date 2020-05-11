<template>
  <div class="container context_top">
    <vue-headful
      title="MedicalHero - Dashboard"
      />
    <h1 style="margin:30px 0;">Dashboard Admin</h1>
    <router-link to="/deal"><el-button type="primary" style="margin:60px 0 60px 0;">Primary</el-button></router-link>
    <div>
      <el-table
        :data="tableData"
        :default-sort = "{prop: 'dateStart', order: 'descending'}"
        style="width: 100%"
      ><!--prop按照date进行排序，order中的descending降序、ascending升序-->
        <el-table-column prop="contact" label="Contact" sortable></el-table-column>
        <el-table-column prop="company" label="Company" sortable></el-table-column>
        <el-table-column prop="stage" label="Stage"
                         :filters="[{ text: '1-quote', value: '1-quote' }, { text: '2-invoice', value: '2-invoice' }]"
                         :filter-method="filterStage"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.stage === '1-quote' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.stage}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status"
                         :filters="[{ text: 'waiting', value: 'waiting' }, { text: 'to do', value: 'to do' }]"
                         :filter-method="filterStatus"
                         filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === 'to do' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.status}}</el-tag>
          </template>>
        </el-table-column>
        <el-table-column prop="dateStart" label="Date" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  data () {
    return {
      tableData: []

      // tableData: [
      //   {
      //     contact: 'didier HU',
      //     company: 'MedicalHero',
      //     stage: '1-quote',
      //     status: 'waiting',
      //     dateStart: '06/05/2020'
      //   },
      //   {
      //     contact: 'Aidier HU',
      //     company: 'BedicalHero',
      //     stage: '2-invoice',
      //     status: 'to do',
      //     dateStart: '04/05/2020'
      //   },
      //   {
      //     contact: 'Zidier HU',
      //     company: 'AedicalHero',
      //     stage: '2-invoice',
      //     status: 'to do',
      //     dateStart: '01/05/2020'
      //   }
      // ]
    }
  },
  mounted () {
    this.getDeal()
  },
  methods: {
    filterStage (value, row) {
      return row.stage === value
    },
    filterStatus (value, row) {
      return row.status === value
    },
    getDeal () {
      this.$http.get('deal').then(async (deals) => {
        await Promise.all(deals.data.map((deal) => {
          this.$http.get('user/user/' + deal.user).then((user) => {
            if (user.data !== null) {
              this.tableData.push({
                contact: user.data.firstName + ' ' + user.data.lastName,
                company: user.data.company,
                stage: this.stageName(deal.stage),
                status: this.status(deal.stage),
                dateStart: deal.dateStart[0],
                dealId: deal._id
              })
            }
          })
        }))
      })
    },
    status (stage) {
      switch (+stage) {
        case 0: return 'To Do'
        case 1: return 'WIP'
        case 2: return 'To Do'
        case 3: return 'WIP'
        case 4: return 'To Do'
        case 5: return 'To Do'
        case 6: return 'WIP'
        case 7: return 'Done'
      }
    },
    stageName (stage) {
      switch (+stage) {
        case 0: return 'Devis'
        case 1: return 'Devis'
        case 2: return 'Facture Acompte'
        case 3: return 'Facture Acompte'
        case 4: return 'Livraison'
        case 5: return 'Facture Solde'
        case 6: return 'Facture Solde'
        case 7: return 'Finis'
      }
    }
  }
}
</script>

<style scoped>
  .context_top{
    margin-top:60px;
  }

</style>
