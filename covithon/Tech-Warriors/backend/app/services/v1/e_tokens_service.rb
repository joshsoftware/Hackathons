module V1
  class ETokensService
    def initialize(params: nil, store:)
      @params = params
      @store = store
    end

    def create
      response = Hash.new
      e_token = @store.e_tokens.find_or_create_by(@params.merge(date: Date.today))

      if e_token.valid?
        e_token.set_uniq_token
        response[:e_token] = e_token
      else
        response[:errors] = e_token.errors.messages
      end
      response
    end
  end
end
