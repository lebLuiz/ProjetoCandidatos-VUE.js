<template >

    <div style="margin: 20px 40px;">
        
        <h2 style="margin-bottom: 50px;">Lista de candidatos</h2>

        <span :style="{ display: 'flex', justifyContent: 'space-between' }">
            <el-input
                clearable
                v-model="pesquisar"
                size="mini"
                placeholder="Filtrar por nome"
                style="width: 50%; float: left;"
            />

            <el-button 
                type="primary" size="medium"
                @click="novoCandidato">
                Novo
            </el-button>
        </span>
        

        <el-table
            :data="
            listaCandidatos.filter(
                (data) =>
                !pesquisar ||
                data.nomeCandidato.toLowerCase().includes(pesquisar.toLowerCase())
            )
            "
            style="width: 100%"
        >
            <el-table-column align="center" label="Candidato" prop="nomeCandidato"> </el-table-column>

            <el-table-column align="center" label="Nascimento">
                <template slot-scope="{row}">
                    <el-tag
                        type="info"
                        effect="plain">
                        <i class="el-icon-date" /> {{ row.dataNasc | moment }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Descrição">
                <template slot-scope="{row}">
                    <span v-if="row.descricao=='' || row.descricao==null" class="nao-ha-dados" >
                        Não há Descrição
                    </span>
                    <span v-else class="limite-caracteres" :title="row.descricao">
                        {{ row.descricao }}
                    </span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Pretensão salarial">
                <template slot-scope="{row}">
                    <el-tag type="warning">
                        <i class="el-icon-money"/> R$ {{ row.pretensaoSalarial }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Ensino médio">
                <template slot-scope="{row}">
                    <el-tag
                        :type="row.ensinoMedioConcluido?'success':'danger'"
                        effect="plain">
                        {{ row.ensinoMedioConcluido | tratarValorBooleanInstituicoes }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Superior" >
                <template slot-scope="{row}">
                    <el-tag
                        :type="row.superiorConcluido?'success':'danger'"
                        effect="plain">
                        {{ row.superiorConcluido | tratarValorBooleanInstituicoes }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Trabalhando" >
                <template slot-scope="{row}">
                    <el-tag
                        :type="row.trabalhando?'success':'danger'"
                        effect="plain">
                        {{ row.trabalhando | tratarValorBoolean }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="right">
            <template slot-scope="scope">
                <el-button icon="el-icon-edit"
                    style="margin-right: 5px;" size="mini"
                    @click="tratarEdicao(scope.row)" />


                <el-button icon="el-icon-delete"
                    slot="reference"
                    size="mini" @click="confirmarRemocao(scope.$index)"
                    type="danger" />
                
            </template>
            </el-table-column>

        </el-table>

        <el-dialog :center="true" :title="candidatoDTO.idCandidato==null?'Novo candidato':'Editando Candidato'" :visible.sync="visibleDialogCandidato">
            <el-form :model="candidatoDTO" :rules="rules" ref="candidatoDTO" label-position="top">

                <el-form-item label="Nome" :label-width="formLabelWidth" prop="nomeCandidato">
                    <el-input clearable size="small" v-model="candidatoDTO.nomeCandidato" autocomplete="off"></el-input>
                </el-form-item>

                <el-row style="display: flex; justify-content: space-between;">

                    <el-form-item label="Data de Nascimento" :label-width="formLabelWidth" prop="dataNasc">
                        <el-date-picker
                            format="dd/MM/yyyy"
                            value-format="timestamp"
                            size="small"
                            v-model="candidatoDTO.dataNasc"
                            type="date"
                            placeholder="00/00/0000">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="Pretensão salarial:" :label-width="formLabelWidth" prop="pretensaoSalarial">
                        <money v-model="candidatoDTO.pretensaoSalarial" v-bind="money" class="input-money" />
                    </el-form-item>

                </el-row>
                
                <el-row style="display: flex; justify-content: space-between;">
                    <el-form-item label="Ensino médio concluído?" :label-width="formLabelWidth">
                        <el-switch
                            @change="analisarSeCandidatoTemEnsinoMedio"
                            style="display: block"
                            v-model="candidatoDTO.ensinoMedioConcluido"
                            active-text="Sim" :active-value="true"
                            inactive-text="Não" :inactive-value="false"/>
                    </el-form-item>

                    <el-form-item v-if="candidatoDTO.ensinoMedioConcluido" label="Superior concluído?" :label-width="formLabelWidth">
                        <el-switch
                            style="display: block"
                            v-model="candidatoDTO.superiorConcluido"
                            active-text="Sim" :active-value="true"
                            inactive-text="Não" :inactive-value="false"/>
                    </el-form-item>

                    <el-form-item label="Trabalhando?" :label-width="formLabelWidth">
                        <el-switch
                            style="display: block"
                            v-model="candidatoDTO.trabalhando"
                            active-text="Sim" :active-value="true"
                            inactive-text="Não" :inactive-value="false"/>
                    </el-form-item>
                </el-row>

                <el-form-item label="Descrição" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" clearable size="small" v-model="candidatoDTO.descricao" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelarSalvamentoCandidato">Cancelar</el-button>
                <el-button type="primary" @click="salvarCandidato('candidatoDTO')">{{ candidatoDTO.idCandidato==null?'Cadastrar':'Salvar' }}</el-button>
            </span>
        </el-dialog>

    </div>
  
</template>

<script>
import CandidatoDTO from "@/models/candidato/CandidatoDTO";
import moment from "moment";
import { Money } from "v-money";

export default {

    components: {
        Money,
    },

    data() {
        return {
            candidatoDTO: new CandidatoDTO(),

            visibleDialogCandidato: false,

            formLabelWidth: '120px',

            listaCandidatos: [],
            pesquisar: "",

            money: {
                decimal: ',',
                thousands: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            },

            rules: {
                nomeCandidato: [
                    { required: true, message: 'Campo obrigatório', trigger: 'change' }
                ],
                dataNasc: [
                    { type: 'date', required: true, message: 'Campo obrigatório', trigger: 'change' }
                ],
                pretensaoSalarial: [
                    { type: 'number', required: true, message: 'Campo obrigatório', trigger: 'change' }
                ]
            },
        };
    },

    created() {
        if(window.localStorage.getItem('listaCandidatos') == undefined ||
            window.localStorage.getItem('listaCandidatos') == null ||
            window.localStorage.getItem('listaCandidatos') == ''){
            window.localStorage.setItem('listaCandidatos', []);
        } else {
            this.listaCandidatos = JSON.parse(localStorage.getItem('listaCandidatos'));
        }
    },

    filters: {
        moment: function(date){
            return moment(date).format("DD/MM/YYYY");
        },

        tratarValorBooleanInstituicoes: function(v) {
            return v?'Concluído':'Não concluído'
        },

        tratarValorBoolean: function(v) {
            return v?'Sim':'Não'
        },
    },

    methods: {

        analisarSeCandidatoTemEnsinoMedio() {
            !this.candidatoDTO.ensinoMedioConcluido ? this.candidatoDTO.superiorConcluido=false : null;
        },

        novoCandidato() {
            this.candidatoDTO = new CandidatoDTO();
            this.visibleDialogCandidato = true;
        },

        confirmarRemocao (index) {
            this.listaCandidatos.splice(index, 1);
            this.processoRemocaoEInsercaoLocalStorage();
        },

        cancelarSalvamentoCandidato () {
            this.visibleDialogCandidato = false;
            this.candidatoDTO = new CandidatoDTO();
        },
        salvarCandidato (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.candidatoDTO.idCandidato == null) {
                        this.candidatoDTO.idCandidato = (Math.floor(Math.random() * (Math.floor(1000) - Math.ceil(100))) + Math.ceil(100));

                        this.listaCandidatos.push(this.candidatoDTO);
                    } else {
                        this.listaCandidatos.forEach((e, i) => {
                            if (e.idCandidato == this.candidatoDTO.idCandidato) {
                                this.listaCandidatos[i] = this.candidatoDTO;
                            }
                        });
                    }

                    this.processoRemocaoEInsercaoLocalStorage();

                    this.candidatoDTO = new CandidatoDTO();
                    this.visibleDialogCandidato = false
                }
            });
        },

        tratarEdicao(row) {
            this.candidatoDTO = new CandidatoDTO();

            this.candidatoDTO.idCandidato = row.idCandidato;
            this.candidatoDTO.nomeCandidato = row.nomeCandidato;
            this.candidatoDTO.dataNasc = row.dataNasc;
            this.candidatoDTO.ensinoMedioConcluido = row.ensinoMedioConcluido;
            this.candidatoDTO.superiorConcluido = row.superiorConcluido;
            this.candidatoDTO.trabalhando = row.trabalhando;
            this.candidatoDTO.pretensaoSalarial = row.pretensaoSalarial;
            this.candidatoDTO.descricao = row.descricao;

            this.visibleDialogCandidato = true;
        },


        async processoRemocaoEInsercaoLocalStorage() {
            await window.localStorage.removeItem('listaCandidatos');
            window.localStorage.setItem('listaCandidatos', JSON.stringify(this.listaCandidatos));
        },
    },

};
</script>

<style scoped>
    
    .limite-caracteres {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
    }

    .nao-ha-dados {
        font-style: italic;
        text-decoration: line-through;
    }

    .input-money{
        border-radius: 4px;
        background-color: #FFFFFF;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: 16px;
        outline: none;
        padding: 0 15px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 200px;
        height: 33px;
    }
    .input-money:hover{
        border: 1px solid #7e9ce2;
    }

</style>