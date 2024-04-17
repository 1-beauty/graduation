<template>
    <NavBar>
        <div class="app">
            <!-- 添加ref属性用于访问DOM元素 -->
            <textarea v-model="displayText" ref="textAreaRef" placeholder="显示区域" rows="10" class="text-area"></textarea>
            <input v-model="inputText" placeholder="输入文字后按回车" @keyup.enter="addText" class="input-area" />
        </div>
    </NavBar>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
    components: {
        NavBar,
    },
    setup() {
        const displayText = ref('');
        const inputText = ref('');
        const textAreaRef = ref(null); // 添加ref引用

        onMounted(async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/out_messages/');
                const datas = response.data.data;
                console.log(datas)
                for (const item of datas) {
                    displayText.value += item.text + '\n';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })

        const addText = async () => {
            if (inputText.value.trim() !== '') {
                //将数据写回数据库
                try {
                    await axios.get('http://127.0.0.1:8000/in_messages/', {
                        params: {
                            text: inputText.value
                        }
                    });
                    displayText.value += inputText.value + '\n';
                    inputText.value = '';
                } catch (error) {
                    console.log('Error posting data:', error)
                }
                // 确保DOM更新后执行滚动
                nextTick(() => {
                    if (textAreaRef.value) {
                        textAreaRef.value.scrollTop = textAreaRef.value.scrollHeight;
                    }
                });
            }
        };

        return { displayText, inputText, addText, textAreaRef };
    }
};
</script>

<style scoped>
.app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: center;
    width: 100%;
    /* 确保居中且响应式 */
}

.text-area,
.input-area {
    width: 80%;
    height: 80%;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 20px;
    box-shadow: 0 2px 6px rgba(224, 150, 150, 0.1);
}

.text-area {
    margin-bottom: 30px;
    height: 450px;
    overflow-y: auto;
}

.input-area {
    margin-bottom: 10px;
}
</style>
