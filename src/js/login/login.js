export default {
    name: 'HelloWorld',
    data() {
        return {
            form: {
            	name: '',
            	password: '',
            }
        }
    },
    methods: {
    	onSubmit () {
    		console.log("login ~");
    	}
    }
}