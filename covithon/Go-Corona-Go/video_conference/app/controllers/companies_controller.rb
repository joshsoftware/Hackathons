# frozen_string_literal: true

class CompaniesController < ApplicationController
  skip_before_action :authenticate!, :only => [:new, :create] 

  def new
    @company = Company.new
    @company.subscriptions.build
  end
  
  def create
    @company = Company.new(company_params)
    if @company.save
      redirect_to new_company_session_path
    else
      redirect_to new_company_registration_path
    end
  end

  def new_meeting
  end

  def show
    Meet.create(room: params['company']['name'])
  end

  private

  def company_params
    params.require(:company).permit(:name, :email, :password, :password_confirmation,
                                    subscriptions_attributes: [:type])
  end
end
